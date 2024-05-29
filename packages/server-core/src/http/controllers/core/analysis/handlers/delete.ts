/*
 * Copyright (c) 2022-2024.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { ForbiddenError, NotFoundError } from '@ebec/http';
import { PermissionID } from '@privateaim/core';
import { isRealmResourceWritable } from '@authup/core-kit';
import { CoreCommand, buildCoreTaskQueueRouterPayload } from '@privateaim/server-analysis-manager-kit';
import type { Request, Response } from 'routup';
import { sendAccepted, useRequestParam } from 'routup';
import { useDataSource } from 'typeorm-extension';
import { useRequestEnv } from '@privateaim/server-http-kit';
import { isQueueRouterUsable, useQueueRouter } from '@privateaim/server-kit';
import { AnalysisEntity, ProjectEntity } from '../../../../../domains';

export async function deleteAnalysisRouteHandler(req: Request, res: Response) : Promise<any> {
    const id = useRequestParam(req, 'id');

    const ability = useRequestEnv(req, 'abilities');
    if (!ability.has(PermissionID.ANALYSIS_DROP)) {
        throw new ForbiddenError();
    }

    const dataSource = await useDataSource();
    const repository = dataSource.getRepository(AnalysisEntity);

    const entity = await repository.findOne({ where: { id }, relations: ['project'] });

    if (!entity) {
        throw new NotFoundError();
    }

    if (!isRealmResourceWritable(useRequestEnv(req, 'realm'), entity.realm_id)) {
        throw new ForbiddenError();
    }

    const { project } = entity;

    const { id: entityId } = entity;

    await repository.remove(entity);

    entity.id = entityId;

    project.analyses--;
    const proposalRepository = dataSource.getRepository(ProjectEntity);
    await proposalRepository.save(project);

    if (isQueueRouterUsable()) {
        const message = buildCoreTaskQueueRouterPayload({
            command: CoreCommand.DESTROY,
            data: {
                id: entity.id,
            },
        });

        const client = useQueueRouter();
        await client.publish(message);
    }

    entity.project = project;

    return sendAccepted(res, entity);
}
