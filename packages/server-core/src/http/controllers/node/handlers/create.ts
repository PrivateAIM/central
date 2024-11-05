/*
 * Copyright (c) 2022-2024.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import {
    RegistryProjectType,
} from '@privateaim/core-kit';
import { PermissionName, createNanoID, isHex } from '@privateaim/kit';
import type { Request, Response } from 'routup';
import { sendCreated } from 'routup';
import { useDataSource, validateEntityJoinColumns } from 'typeorm-extension';
import { useRequestIdentityRealm, useRequestPermissionChecker } from '@privateaim/server-http-kit';
import { isQueueRouterUsable, useQueueRouter } from '@privateaim/server-kit';
import { isRealmResourceWritable } from '@authup/core-kit';
import { ForbiddenError } from '@ebec/http';
import { RoutupContainerAdapter } from '@validup/adapter-routup';
import { RegistryCommand, buildRegistryTaskQueueRouterPayload } from '../../../../components';
import { NodeValidator, createNodeRobot } from '../utils';
import {
    NodeEntity, RegistryEntity, RegistryProjectEntity,
} from '../../../../domains';
import { HTTPHandlerOperation } from '../../constants';

export async function createNodeRouteHandler(req: Request, res: Response) : Promise<any> {
    const permissionChecker = useRequestPermissionChecker(req);
    await permissionChecker.preCheck({ name: PermissionName.NODE_CREATE });

    const validator = new NodeValidator();
    const validatorAdapter = new RoutupContainerAdapter(validator);
    const data = await validatorAdapter.run(req, {
        group: HTTPHandlerOperation.CREATE,
    });

    const dataSource = await useDataSource();
    await validateEntityJoinColumns(data, {
        dataSource,
        entityTarget: NodeEntity,
    });

    const realm = useRequestIdentityRealm(req);
    if (data.realm_id) {
        if (!isRealmResourceWritable(realm, data.realm_id)) {
            throw new ForbiddenError('You are not permitted to create this node.');
        }
    } else {
        data.realm_id = realm.id;
    }

    const repository = dataSource.getRepository(NodeEntity);
    const entity = repository.create(data);

    // -----------------------------------------------------

    if (
        entity.public_key &&
        !isHex(result.data.public_key)
    ) {
        entity.public_key = Buffer
            .from(entity.public_key, 'utf8')
            .toString('hex');
    }

    // -----------------------------------------------------

    let registryId : string | undefined;
    if (entity.registry_id) {
        registryId = entity.registry_id;
    } else {
        const registryRepository = dataSource.getRepository(RegistryEntity);
        // todo: default registry should be selected by unique identifying attribute
        const registries = await registryRepository.find({
            take: 1,
        });
        const [registry] = registries;
        if (registry) {
            registryId = entity.registry_id;
        }
    }

    if (registryId) {
        const registryProjectExternalName = entity.external_name || createNanoID();
        entity.external_name = registryProjectExternalName;

        const registryProjectRepository = dataSource.getRepository(RegistryProjectEntity);
        const registryProject = registryProjectRepository.create({
            external_name: registryProjectExternalName,
            name: entity.name,
            type: RegistryProjectType.NODE,
            realm_id: entity.realm_id,
            registry_id: registryId,
            public: false,
        });

        await registryProjectRepository.save(registryProject);

        entity.registry_project_id = registryProject.id;

        if (isQueueRouterUsable()) {
            const queueRouter = useQueueRouter();
            await queueRouter.publish(buildRegistryTaskQueueRouterPayload({
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
