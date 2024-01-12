/*
 * Copyright (c) 2022-2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { check, validationResult } from 'express-validator';
import { AnalysisNodeApprovalStatus } from '@personalhealthtrain/core';
import { BadRequestError, NotFoundError } from '@ebec/http';
import { isRealmResourceWritable } from '@authup/core';
import type { Request } from 'routup';
import { useDataSource } from 'typeorm-extension';
import { StationEntity } from '../../../../../domains/station/entity';
import type { TrainStationEntity } from '../../../../../domains/train-station/entity';
import { TrainEntity } from '../../../../../domains/train';
import { useRequestEnv } from '../../../../request';
import type { RequestValidationResult } from '../../../../validation';
import {
    RequestValidationError,
    buildRequestValidationErrorMessage,
    extendRequestValidationResultWithRelation,
    initRequestValidationResult,
    matchedValidationData,
} from '../../../../validation';
import { ProposalStationEntity } from '../../../../../domains/proposal-station/entity';

export async function runTrainStationValidation(
    req: Request,
    operation: 'create' | 'update',
) : Promise<RequestValidationResult<TrainStationEntity>> {
    const result : RequestValidationResult<TrainStationEntity> = initRequestValidationResult();
    if (operation === 'create') {
        await check('station_id')
            .exists()
            .isUUID()
            .run(req);

        await check('train_id')
            .exists()
            .isUUID()
            .run(req);
    }

    await check('index')
        .exists()
        .isInt()
        .optional()
        .run(req);

    if (operation === 'update') {
        await check('approval_status')
            .optional({ nullable: true })
            .isIn(Object.values(AnalysisNodeApprovalStatus))
            .run(req);

        await check('comment')
            .optional({ nullable: true })
            .isString()
            .run(req);
    }

    // ----------------------------------------------

    const validation = validationResult(req);
    if (!validation.isEmpty()) {
        throw new RequestValidationError(validation);
    }

    result.data = matchedValidationData(req, { includeOptionals: true });

    // ----------------------------------------------

    await extendRequestValidationResultWithRelation(result, TrainEntity, {
        id: 'train_id',
        entity: 'train',
    });
    if (result.relation.train) {
        if (
            !isRealmResourceWritable(useRequestEnv(req, 'realm'), result.relation.train.realm_id)
        ) {
            throw new BadRequestError(buildRequestValidationErrorMessage('train_id'));
        }

        result.data.train_realm_id = result.relation.train.realm_id;
    }

    await extendRequestValidationResultWithRelation(result, StationEntity, {
        id: 'station_id',
        entity: 'station',
    });

    if (result.relation.station) {
        result.data.station_realm_id = result.relation.station.realm_id;
    }

    if (
        result.relation.station &&
        result.relation.train
    ) {
        const dataSource = await useDataSource();
        const proposalStationRepository = dataSource.getRepository(ProposalStationEntity);
        const proposalStation = await proposalStationRepository.findOneBy({
            project_id: result.relation.train.project_id,
            node_id: result.relation.station.id,
        });

        if (!proposalStation) {
            throw new NotFoundError('The referenced station is not part of the train proposal.');
        }
    }

    // ----------------------------------------------

    return result;
}
