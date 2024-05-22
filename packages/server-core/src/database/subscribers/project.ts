/*
 * Copyright (c) 2021-2024.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { publishDomainEvent, useRedisPublishClient } from '@privateaim/server-kit';
import type {
    EntitySubscriberInterface, InsertEvent, RemoveEvent, UpdateEvent,
} from 'typeorm';
import { EventSubscriber } from 'typeorm';
import type {
    Project,
} from '@privateaim/core';
import {
    DomainEventName,
    DomainType,
    buildDomainChannelName,
    buildDomainNamespaceName,
} from '@privateaim/core';
import { ProjectEntity } from '../../domains';

async function publishEvent(
    event: `${DomainEventName}`,
    data: Project,
) {
    await publishDomainEvent(
        useRedisPublishClient(),
        {
            type: DomainType.PROJECT,
            event,
            data,
        },
        [
            {
                channel: (id) => buildDomainChannelName(DomainType.PROJECT, id),
                namespace: buildDomainNamespaceName(data.realm_id),
            },
            {
                channel: (id) => buildDomainChannelName(DomainType.PROJECT, id),
            },
        ],
    );
}

@EventSubscriber()
export class ProjectSubscriber implements EntitySubscriberInterface<ProjectEntity> {
    listenTo(): CallableFunction | string {
        return ProjectEntity;
    }

    async afterInsert(event: InsertEvent<ProjectEntity>): Promise<any> {
        await publishEvent(DomainEventName.CREATED, event.entity);
    }

    async afterUpdate(event: UpdateEvent<ProjectEntity>): Promise<any> {
        await publishEvent(DomainEventName.UPDATED, event.entity as ProjectEntity);
    }

    async beforeRemove(event: RemoveEvent<ProjectEntity>): Promise<any> {
        await publishEvent(DomainEventName.DELETED, event.entity);
    }
}
