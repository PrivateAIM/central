/*
 * Copyright (c) 2022-2023.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type { ComponentExecutionContext } from '@personalhealthtrain/central-server-common';
import { publish } from 'amqp-extension';
import { Component } from '../../constants';
import type { RouterCommand } from '../constants';
import { RouterEvent } from '../constants';
import { buildAPIQueueMessage } from '../../utils';
import type { RouterStatusPayload } from '../type';

export async function writeCheckingEvent<T extends RouterStatusPayload>(
    context: ComponentExecutionContext<`${RouterCommand}`, T>,
) {
    await publish(buildAPIQueueMessage({
        event: RouterEvent.CHECKING,
        component: Component.ROUTER,
        command: context.command,
        data: context.data,
    }));

    return context.data;
}
