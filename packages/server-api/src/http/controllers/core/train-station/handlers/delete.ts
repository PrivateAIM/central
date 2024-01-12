/*
 * Copyright (c) 2022-2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { PermissionID } from '@personalhealthtrain/core';
import { ForbiddenError, NotFoundError } from '@ebec/http';
import type { Request, Response } from 'routup';
import { sendAccepted, useRequestParam } from 'routup';
import { MoreThan } from 'typeorm';
import { isRealmResourceWritable } from '@authup/core';
import { useDataSource } from 'typeorm-extension';
import { TrainStationEntity } from '../../../../../domains/train-station/entity';
import { useRequestEnv } from '../../../../request';
import { TrainEntity } from '../../../../../domains/train';

export async function deleteTrainStationRouteHandler(req: Request, res: Response) : Promise<any> {
    const id = useRequestParam(req, 'id');

    const ability = useRequestEnv(req, 'ability');
    if (
        !ability.has(PermissionID.ANALYSIS_EDIT) &&
        !ability.has(PermissionID.ANALYSIS_APPROVE)
    ) {
        throw new ForbiddenError();
    }

    const dataSource = await useDataSource();
    const repository = dataSource.getRepository(TrainStationEntity);

    const entity = await repository.findOneBy({ id });

    if (!entity) {
        throw new NotFoundError();
    }

    if (
        !isRealmResourceWritable(useRequestEnv(req, 'realm'), entity.station_realm_id) &&
        !isRealmResourceWritable(useRequestEnv(req, 'realm'), entity.train_realm_id)
    ) {
        throw new ForbiddenError();
    }

    const { id: entityId } = entity;

    await repository.remove(entity);

    entity.id = entityId;

    // -------------------------------------------

    await repository.createQueryBuilder()
        .update()
        .where({
            index: MoreThan(entity.index),
            train_id: entity.train_id,
        })
        .set({
            index: () => '`index` - 1',
        })
        .execute();

    // -------------------------------------------

    const trainRepository = dataSource.getRepository(TrainEntity);
    const train = await trainRepository.findOneBy({ id: entity.train_id });

    train.nodes -= 1;
    await trainRepository.save(train);

    entity.train = train;

    // -------------------------------------------

    return sendAccepted(res, entity);
}
