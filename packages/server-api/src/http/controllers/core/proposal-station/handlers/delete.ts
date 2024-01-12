/*
 * Copyright (c) 2022-2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { PermissionID } from '@personalhealthtrain/core';
import { ForbiddenError, NotFoundError } from '@ebec/http';
import { isRealmResourceWritable } from '@authup/core';
import type { Request, Response } from 'routup';
import { sendAccepted, useRequestParam } from 'routup';
import { useDataSource } from 'typeorm-extension';
import { ProposalStationEntity } from '../../../../../domains/proposal-station/entity';
import { useRequestEnv } from '../../../../request';

export async function deleteProposalStationRouteHandler(req: Request, res: Response) : Promise<any> {
    const id = useRequestParam(req, 'id');

    const ability = useRequestEnv(req, 'ability');

    if (
        !ability.has(PermissionID.PROJECT_EDIT) &&
        !ability.has(PermissionID.PROJECT_DROP)
    ) {
        throw new ForbiddenError('You are not allowed to drop a proposal station.');
    }

    const dataSource = await useDataSource();
    const repository = dataSource.getRepository(ProposalStationEntity);

    const entity = await repository.findOneBy({ id });

    if (!entity) {
        throw new NotFoundError();
    }

    if (
        !isRealmResourceWritable(useRequestEnv(req, 'realm'), entity.node_realm_id) &&
        !isRealmResourceWritable(useRequestEnv(req, 'realm'), entity.project_realm_id)
    ) {
        throw new ForbiddenError('You are not authorized to drop this proposal station.');
    }

    const { id: entityId } = entity;

    await repository.remove(entity);

    entity.id = entityId;

    return sendAccepted(res, entity);
}
