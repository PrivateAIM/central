/*
 * Copyright (c) 2023.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { transformComponentErrorForQueuePayload } from '@personalhealthtrain/central-server-common';
import type { ComponentContextWithError } from '@personalhealthtrain/central-server-common';
import type { PublishOptionsExtended } from 'amqp-extension';
import { ComponentName } from '../../constants';
import { useRouterLogger } from '../../router/utils';
import type { QueueRouterPayload } from '../../utils';
import { ROUTER_QUEUE_ROUTING_KEY, cleanupPayload } from '../../utils';
import type { ExtractorCommandContext, ExtractorEventContext } from '../type';

export function buildExtractorQueuePayload(
    context: ExtractorCommandContext,
) : PublishOptionsExtended<QueueRouterPayload> {
    return {
        exchange: {
            routingKey: ROUTER_QUEUE_ROUTING_KEY,
        },
        content: {
            data: context.data,
            metadata: {
                component: ComponentName.EXTRACTOR,
                command: context.command,
            },
        },
    };
}

export function buildExtractorAggregatorQueuePayload(
    context: ExtractorEventContext | ComponentContextWithError<ExtractorEventContext>,
) {
    const error = transformComponentErrorForQueuePayload(context);
    if (error) {
        useRouterLogger().error('Command execution failed.', {
            command: context.command,
            ...error,
        });
    }

    return {
        exchange: {
            routingKey: 'api.aggregator.tm',
        },
        content: {
            data: cleanupPayload({ ...context.data }),
            metadata: {
                command: context.command,
                component: ComponentName.EXTRACTOR,
                event: context.event,
            },
            ...(error ? { error } : {}),
        },
    };
}
