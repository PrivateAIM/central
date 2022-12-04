/*
 * Copyright (c) 2022-2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { Ecosystem, TrainType } from '@personalhealthtrain/central-common';
import { check, validationResult } from 'express-validator';
import { BadRequestError } from '@ebec/http';
import { isPermittedForResourceRealm } from '@authelion/common';
import { Request } from 'routup';
import { MasterImageEntity } from '../../../../../domains/core/master-image/entity';
import { ProposalEntity } from '../../../../../domains/core/proposal/entity';
import { RegistryEntity } from '../../../../../domains/core/registry/entity';
import { TrainEntity } from '../../../../../domains/core/train';
import {
    ExpressValidationError,
    ExpressValidationResult, extendExpressValidationResultWithRelation,
    initExpressValidationResult,
    matchedValidationData,
} from '../../../../express-validation';
import { TrainFileEntity } from '../../../../../domains/core/train-file/entity';
import { useRequestEnv } from '../../../../request';

export async function runTrainValidation(
    req: Request,
    operation: 'create' | 'update',
) : Promise<ExpressValidationResult<TrainEntity>> {
    const result : ExpressValidationResult<TrainEntity> = initExpressValidationResult();

    if (operation === 'create') {
        await check('proposal_id')
            .exists()
            .notEmpty()
            .isUUID()
            .run(req);

        await check('type')
            .exists()
            .isString()
            .custom((value) => Object.values(TrainType).includes(value))
            .run(req);
    }

    await check('user_rsa_secret_id')
        .notEmpty()
        .isUUID()
        .optional({ nullable: true })
        .run(req);

    await check('user_paillier_secret_id')
        .notEmpty()
        .isUUID()
        .optional({ nullable: true })
        .run(req);

    await check('name')
        .notEmpty()
        .isLength({ min: 1, max: 128 })
        .optional({ nullable: true })
        .run(req);

    await check('entrypoint_file_id')
        .isUUID()
        .optional({ nullable: true })
        .run(req);

    await check('hash_signed')
        .notEmpty()
        .isLength({ min: 10, max: 8096 })
        .optional({ nullable: true })
        .run(req);

    await check('master_image_id')
        .exists()
        .notEmpty()
        .isUUID()
        .optional({ nullable: true })
        .run(req);

    await check('registry_id')
        .exists()
        .notEmpty()
        .isUUID()
        .optional({ nullable: true })
        .run(req);

    await check('query')
        .isString()
        .isLength({ min: 1, max: 4096 })
        .optional({ nullable: true })
        .run(req);

    // ----------------------------------------------

    const validation = validationResult(req);
    if (!validation.isEmpty()) {
        throw new ExpressValidationError(validation);
    }

    result.data = matchedValidationData(req, { includeOptionals: true });

    // ----------------------------------------------

    await extendExpressValidationResultWithRelation(result, MasterImageEntity, {
        id: 'master_image_id',
        entity: 'master_image',
    });
    await extendExpressValidationResultWithRelation(result, ProposalEntity, {
        id: 'proposal_id',
        entity: 'proposal',
    });
    await extendExpressValidationResultWithRelation(result, RegistryEntity, {
        id: 'registry_id',
        entity: 'registry',
    });

    await extendExpressValidationResultWithRelation(result, TrainFileEntity, {
        id: 'entrypoint_file_id',
        entity: 'entrypoint_file',
    });

    if (result.relation.proposal) {
        if (!isPermittedForResourceRealm(useRequestEnv(req, 'realmId'), result.relation.proposal.realm_id)) {
            throw new BadRequestError('The referenced proposal realm is not permitted.');
        }
    }

    if (result.relation.registry) {
        if (result.relation.registry.ecosystem !== Ecosystem.DEFAULT) {
            throw new BadRequestError('The registry must be part of the default ecosystem.');
        }
    }

    return result;
}
