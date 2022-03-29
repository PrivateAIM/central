/*
 * Copyright (c) 2021-2021.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import {
    EntitySubscriberInterface, EventSubscriber, InsertEvent, RemoveEvent, UpdateEvent,
} from 'typeorm';
import {
    buildSocketRealmNamespaceName,
    buildSocketTrainRoomName,
} from '@personalhealthtrain/central-common';
import { useSocketEmitter } from '../../config/socket-emitter';
import { TrainEntity } from '../../domains/core/train/entity';

enum Operation {
    CREATE = 'trainCreated',
    UPDATE = 'trainUpdated',
    DELETE = 'trainDeleted',
}

function publish(
    operation: `${Operation}`,
    item: TrainEntity,
) {
    useSocketEmitter()
        .in(buildSocketTrainRoomName())
        .emit(operation, {
            data: item,
            meta: {
                roomName: buildSocketTrainRoomName(),
            },
        });

    if (operation !== Operation.CREATE) {
        useSocketEmitter()
            .in(buildSocketTrainRoomName(item.id))
            .emit(operation, {
                data: item,
                meta: {
                    roomName: buildSocketTrainRoomName(item.id),
                    roomId: item.id,
                },
            });
    }

    const workspaces = [
        buildSocketRealmNamespaceName(item.realm_id),
    ];

    for (let i = 0; i < workspaces.length; i++) {
        useSocketEmitter()
            .of(workspaces[i])
            .in(buildSocketTrainRoomName())
            .emit(operation, {
                data: item,
                meta: {
                    roomName: buildSocketTrainRoomName(),
                },
            });
    }

    if (operation !== Operation.CREATE) {
        for (let i = 0; i < workspaces.length; i++) {
            useSocketEmitter()
                .of(workspaces[i])
                .in(buildSocketTrainRoomName(item.id))
                .emit(operation, {
                    data: item,
                    meta: {
                        roomName: buildSocketTrainRoomName(item.id),
                        roomId: item.id,
                    },
                });
        }
    }
}

@EventSubscriber()
export class TrainSubscriber implements EntitySubscriberInterface<TrainEntity> {
    listenTo(): CallableFunction | string {
        return TrainEntity;
    }

    afterInsert(event: InsertEvent<TrainEntity>): Promise<any> | void {
        publish(Operation.CREATE, event.entity);
    }

    afterUpdate(event: UpdateEvent<TrainEntity>): Promise<any> | void {
        publish(Operation.UPDATE, event.entity as TrainEntity);
    }

    beforeRemove(event: RemoveEvent<TrainEntity>): Promise<any> | void {
        publish(Operation.DELETE, event.entity);
    }
}
