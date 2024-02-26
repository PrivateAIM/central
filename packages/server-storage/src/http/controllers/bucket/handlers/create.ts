/*
 * Copyright (c) 2022-2024.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { PermissionID } from '@privateaim/core';
import { ForbiddenError } from '@ebec/http';
import type { Request, Response } from 'routup';
import { sendCreated } from 'routup';
import { useDataSource } from 'typeorm-extension';
import { useMinio } from '../../../../core';
import { useRequestEnv } from '../../../request';
import { BucketEntity, getActorFromRequest } from '../../../../domains';
import { runProjectValidation } from '../utils/validation';

export async function executeBucketRouteCreateHandler(req: Request, res: Response) : Promise<any> {
    const ability = useRequestEnv(req, 'ability');
    if (!ability.has(PermissionID.BUCKET_ADD)) {
        throw new ForbiddenError();
    }

    const actor = getActorFromRequest(req);
    if (!actor) {
        throw new ForbiddenError('Only users and robots are permitted to create a bucket.');
    }

    const result = await runProjectValidation(req, 'create');

    const dataSource = await useDataSource();
    const repository = dataSource.getRepository(BucketEntity);
    const entity = repository.create({
        actor_id: actor.id,
        actor_type: actor.type,
        ...result.data,
    });

    await repository.save(entity);

    const minio = useMinio();
    await minio.makeBucket(entity.name, entity.region);

    return sendCreated(res, entity);
}
