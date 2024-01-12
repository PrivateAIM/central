/*
 * Copyright (c) 2021-2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { publishDomainEvent } from '@personalhealthtrain/server-core';
import { CoreCommand, buildCoreQueuePayload } from '@personalhealthtrain/server-train-manager';
import type {
    EntitySubscriberInterface, InsertEvent, RemoveEvent, UpdateEvent,
} from 'typeorm';
import { EventSubscriber } from 'typeorm';
import type {
    Node, Analysis,
} from '@personalhealthtrain/core';
import {
    DomainEventName,
    DomainType,
    buildDomainChannelName,

    buildDomainNamespaceName,
} from '@personalhealthtrain/core';
import { publish as publishMessage } from 'amqp-extension';
import { TrainEntity } from '../../domains';

async function publishEvent(
    event: `${DomainEventName}`,
    data: Analysis,
) {
    await publishDomainEvent(
        {
            type: DomainType.ANALYSIS,
            event,
            data,
        },
        [
            {
                channel: (id) => buildDomainChannelName(DomainType.ANALYSIS, id),
            },
            {
                channel: (id) => buildDomainChannelName(DomainType.ANALYSIS, id),
                namespace: buildDomainNamespaceName(data.realm_id),
            },
        ],
    );
}
@EventSubscriber()
export class TrainSubscriber implements EntitySubscriberInterface<TrainEntity> {
    listenTo(): CallableFunction | string {
        return TrainEntity;
    }

    async afterInsert(event: InsertEvent<TrainEntity>): Promise<any> {
        await publishEvent(DomainEventName.CREATED, event.entity);

        const message = buildCoreQueuePayload({
            command: CoreCommand.CONFIGURE,
            data: {
                id: event.entity.id,
            },
        });

        await publishMessage(message);
    }

    async afterUpdate(event: UpdateEvent<TrainEntity>): Promise<any> {
        await publishEvent(DomainEventName.UPDATED, event.entity as TrainEntity);
    }

    async beforeRemove(event: RemoveEvent<TrainEntity>): Promise<any> {
        await publishEvent(DomainEventName.DELETED, event.entity);

        const message = buildCoreQueuePayload({
            command: CoreCommand.DESTROY,
            data: {
                id: event.entity.id,
            },
        });

        await publishMessage(message);
    }
}
