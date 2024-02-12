/*
 * Copyright (c) 2022-2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { PermissionID } from '@privateaim/core';
import { ForbiddenError, NotFoundError } from '@ebec/http';
import type { Request, Response } from 'routup';
import { sendAccepted, useRequestParam } from 'routup';
import { useDataSource } from 'typeorm-extension';
import { AnalysisLogEntity } from '../../../../../domains';
import { useRequestEnv } from '../../../../request';

export async function deleteAnalysisLogRouteHandler(req: Request, res: Response) : Promise<any> {
    const id = useRequestParam(req, 'id');

    const ability = useRequestEnv(req, 'ability');
    if (
        !ability.has(PermissionID.ANALYSIS_EDIT)
    ) {
        throw new ForbiddenError();
    }

    const dataSource = await useDataSource();
    const repository = dataSource.getRepository(AnalysisLogEntity);

    const entity = await repository.findOneBy({ id });

    if (!entity) {
        throw new NotFoundError();
    }

    const { id: entityId } = entity;

    await repository.remove(entity);

    entity.id = entityId;

    // -------------------------------------------

    return sendAccepted(res, entity);
}
