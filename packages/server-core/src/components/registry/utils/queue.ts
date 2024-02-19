/*
 * Copyright (c) 2021-2024.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type { PublishOptionsExtended } from 'amqp-extension';
import { ComponentName } from '../../constants';
import { ROUTER_QUEUE_ROUTING_KEY } from '../../router';
import type { QueueRouterPayload } from '../../router';
import type { RegistryCommandContext } from '../type';

export function buildRegistryPayload(
    context: RegistryCommandContext,
) : PublishOptionsExtended<QueueRouterPayload> {
    return {
        exchange: {
            routingKey: ROUTER_QUEUE_ROUTING_KEY,
        },
        content: {
            data: context.data,
            metadata: {
                component: ComponentName.REGISTRY,
                command: context.command,
            },
        },
    };
}
