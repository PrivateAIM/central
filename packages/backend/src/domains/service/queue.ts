/*
 * Copyright (c) 2021-2021.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { Message, buildMessage } from 'amqp-extension';
import { AuthClientType, Client } from '@personalhealthtrain/ui-common';
import { AuthClientSecurityComponentCommand } from '../../components/auth-security';
import { MessageQueueSelfRoutingKey } from '../../config/service/mq';

export type AuthClientSecurityQueueMessagePayload = {
    id: string | number,
    type: AuthClientType,
    clientId: typeof Client.prototype.id,
    clientSecret: typeof Client.prototype.secret
}

export function buildAuthClientSecurityQueueMessage(
    type: AuthClientSecurityComponentCommand,
    context: AuthClientSecurityQueueMessagePayload,
) : Message {
    return buildMessage({
        options: {
            routingKey: MessageQueueSelfRoutingKey.COMMAND,
        },
        type,
        data: context,
        metadata: {},
    });
}
