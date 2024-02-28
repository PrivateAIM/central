/*
 * Copyright (c) 2022-2024.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import {
    PermissionID,
    RegistryProjectType,
    createNanoID,
} from '@privateaim/core';
import { ForbiddenError } from '@ebec/http';
import type { Request, Response } from 'routup';
import { sendCreated } from 'routup';
import { useDataSource } from 'typeorm-extension';
import { RegistryCommand } from '../../../../../components';
import { buildRegistryPayload } from '../../../../../components/registry/utils/queue';
import { hasAmqpClient, useAmqpClient } from '../../../../../core';
import { useRequestEnv } from '../../../../request';
import { createNodeRobot, runNodeValidation } from '../utils';
import { NodeEntity, RegistryProjectEntity } from '../../../../../domains';

export async function createNodeRouteHandler(req: Request, res: Response) : Promise<any> {
    const ability = useRequestEnv(req, 'ability');
    if (!ability.has(PermissionID.NODE_ADD)) {
        throw new ForbiddenError();
    }

    const result = await runNodeValidation(req, 'create');

    const dataSource = await useDataSource();
    const repository = dataSource.getRepository(NodeEntity);

    const entity = repository.create(result.data);

    // -----------------------------------------------------

    if (entity.registry_id) {
        const registryProjectExternalName = entity.external_name || createNanoID();
        entity.external_name = registryProjectExternalName;

        const registryProjectRepository = dataSource.getRepository(RegistryProjectEntity);
        const registryProject = registryProjectRepository.create({
            external_name: registryProjectExternalName,
            name: entity.name,
            type: RegistryProjectType.STATION,
            realm_id: entity.realm_id,
            registry_id: entity.registry_id,
            public: false,
        });

        await registryProjectRepository.save(registryProject);

        entity.registry_project_id = registryProject.id;

        if (hasAmqpClient()) {
            const client = useAmqpClient();
            await client.publish(buildRegistryPayload({
                command: RegistryCommand.PROJECT_LINK,
                data: {
                    id: registryProject.id,
                },
            }));
        }
    }

    // -----------------------------------------------------

    await createNodeRobot(entity);

    // -----------------------------------------------------

    await repository.save(entity);

    return sendCreated(res, entity);
}
