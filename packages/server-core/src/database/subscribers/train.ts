/*
 * Copyright (c) 2021-2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { publishDomainEvent } from '@privateaim/server-kit';
import { CoreCommand, buildCoreQueuePayload } from '@privateaim/server-analysis-manager';
import type {
    EntitySubscriberInterface, InsertEvent, RemoveEvent, UpdateEvent,
} from 'typeorm';
import { EventSubscriber } from 'typeorm';
import type {
    Analysis,
} from '@privateaim/core';
import {
    DomainEventName,
    DomainType,
    buildDomainChannelName,

    buildDomainNamespaceName,
} from '@privateaim/core';
import { publish as publishMessage } from 'amqp-extension';
import {useRedisClient, useRedisPublishClient} from '../../core';
import { AnalysisEntity } from '../../domains';

async function publishEvent(
    event: `${DomainEventName}`,
    data: Analysis,
) {
    await publishDomainEvent(
        useRedisPublishClient(),
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
export class TrainSubscriber implements EntitySubscriberInterface<AnalysisEntity> {
    listenTo(): CallableFunction | string {
        return AnalysisEntity;
    }

    async afterInsert(event: InsertEvent<AnalysisEntity>): Promise<any> {
        await publishEvent(DomainEventName.CREATED, event.entity);

        const message = buildCoreQueuePayload({
            command: CoreCommand.CONFIGURE,
            data: {
                id: event.entity.id,
            },
        });

        await publishMessage(message);
    }

    async afterUpdate(event: UpdateEvent<AnalysisEntity>): Promise<any> {
        await publishEvent(DomainEventName.UPDATED, event.entity as AnalysisEntity);
    }

    async beforeRemove(event: RemoveEvent<AnalysisEntity>): Promise<any> {
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
