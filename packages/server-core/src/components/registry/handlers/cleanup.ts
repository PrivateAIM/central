/*
 * Copyright (c) 2023.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import {
    REGISTRY_MASTER_IMAGE_PROJECT_NAME,
    buildRegistryClientConnectionStringFromRegistry,
} from '@privateaim/core';
import { publish } from 'amqp-extension';
import { useDataSource } from 'typeorm-extension';
import { useLogger } from '../../../config';
import { RegistryEntity, RegistryProjectEntity } from '../../../domains';
import { ComponentName } from '../../constants';
import { RegistryCommand } from '../constants';
import type { RegistryCleanupPayload } from '../type';
import { buildRegistryPayload } from '../utils/queue';
import { createBasicHarborAPIClient } from './utils';

export async function cleanupRegistry(payload: RegistryCleanupPayload) {
    if (!payload.id) {
        useLogger()
            .warn('No registry specified.', {
                component: ComponentName.REGISTRY,
                command: RegistryCommand.CLEANUP,
            });

        return;
    }

    const dataSource = await useDataSource();
    const repository = dataSource.getRepository(RegistryEntity);
    const entity = await repository.createQueryBuilder('registry')
        .addSelect([
            'registry.account_secret',
        ])
        .where('registry.id = :id', { id: payload.id })
        .getOne();

    if (!entity) {
        useLogger()
            .error('Registry not found.', {
                component: ComponentName.REGISTRY,
                command: RegistryCommand.CLEANUP,
            });

        return;
    }

    const connectionString = buildRegistryClientConnectionStringFromRegistry(entity);
    const httpClient = createBasicHarborAPIClient(connectionString);

    const { data: projects } = await httpClient.project.getAll();

    const projectRepository = dataSource.getRepository(RegistryProjectEntity);
    const projectEntities = await projectRepository.find();
    const projectEntityExternalNames = projectEntities.map((item) => item.external_name);

    for (let i = 0; i < projects.length; i++) {
        const index = projectEntityExternalNames.indexOf(`${projects[i].name}`);
        if (index !== -1) {
            continue;
        }

        if (projects[i].name === REGISTRY_MASTER_IMAGE_PROJECT_NAME) {
            continue;
        }

        const queueMessage = buildRegistryPayload({
            command: RegistryCommand.PROJECT_UNLINK,
            data: {
                registryId: entity.id,
                externalName: projects[i].name,
            },
        });

        await publish(queueMessage);
    }
}
