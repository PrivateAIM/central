/*
 * Copyright (c) 2021.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type { SocketBase } from './types';

export function subscribeSocketRoom(
    socket: SocketBase,
    roomName: string,
) {
    if (!socket.data.roomConnections) {
        socket.data.roomConnections = {};
    }

    if (!socket.data.roomConnections[roomName]) {
        socket.data.roomConnections[roomName] = 0;
    }

    socket.data.roomConnections[roomName]++;

    socket.join(roomName);
}

export function unsubscribeSocketRoom(
    socket: SocketBase,
    roomName: string,
) {
    if (!socket.data.roomConnections) {
        return;
    }

    if (socket.data.roomConnections[roomName]) {
        if (socket.data.roomConnections[roomName] > 1) {
            socket.data.roomConnections[roomName]--;
        } else {
            delete socket.data.roomConnections[roomName];
        }
    }

    if (!socket.data.roomConnections[roomName]) {
        socket.leave(roomName);
    }
}
