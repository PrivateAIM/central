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
    ProposalStation,
    buildSocketProposalStationRoomName,
    buildSocketRealmNamespaceName,
} from '@personalhealthtrain/ui-common';
import { useSocketEmitter } from '../../config/socket-emitter';

type Operator = 'create' | 'update' | 'delete';
type Event = 'proposalStationCreated' | 'proposalStationUpdated' | 'proposalStationDeleted';

const OperatorEventMap : Record<Operator, Event> = {
    create: 'proposalStationCreated',
    update: 'proposalStationUpdated',
    delete: 'proposalStationDeleted',
};

function publish(
    operation: Operator,
    item: ProposalStation,
) {
    useSocketEmitter()
        .in(buildSocketProposalStationRoomName())
        .emit(OperatorEventMap[operation], {
            data: item,
            meta: {
                roomName: buildSocketProposalStationRoomName(),
            },
        });

    if (operation !== 'create') {
        useSocketEmitter()
            .in(buildSocketProposalStationRoomName(item.id))
            .emit(OperatorEventMap[operation], {
                data: item,
                meta: {
                    roomName: buildSocketProposalStationRoomName(item.id),
                    roomId: item.id,
                },
            });
    }

    const workspaces = [
        buildSocketRealmNamespaceName(item.station_realm_id),
        buildSocketRealmNamespaceName(item.proposal_realm_id),
    ];

    for (let i = 0; i < workspaces.length; i++) {
        useSocketEmitter()
            .of(workspaces[i])
            .in(buildSocketProposalStationRoomName())
            .emit(OperatorEventMap[operation], {
                data: item,
                meta: {
                    roomName: buildSocketProposalStationRoomName(),
                },
            });
    }

    if (operation !== 'create') {
        for (let i = 0; i < workspaces.length; i++) {
            useSocketEmitter()
                .of(workspaces[i])
                .in(buildSocketProposalStationRoomName(item.id))
                .emit(OperatorEventMap[operation], {
                    data: item,
                    meta: {
                        roomName: buildSocketProposalStationRoomName(item.id),
                        roomId: item.id,
                    },
                });
        }
    }
}

@EventSubscriber()
export class ProposalStationSubscriber implements EntitySubscriberInterface<ProposalStation> {
    listenTo(): CallableFunction | string {
        return ProposalStation;
    }

    afterInsert(event: InsertEvent<ProposalStation>): Promise<any> | void {
        publish('create', event.entity);
    }

    afterUpdate(event: UpdateEvent<ProposalStation>): Promise<any> | void {
        publish('update', event.entity as ProposalStation);
        return undefined;
    }

    beforeRemove(event: RemoveEvent<ProposalStation>): Promise<any> | void {
        publish('delete', event.entity);

        return undefined;
    }
}
