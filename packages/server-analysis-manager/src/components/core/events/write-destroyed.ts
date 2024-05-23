/*
 * Copyright (c) 2022-2024.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { useAmqpClient } from '@privateaim/server-kit';
import { CoreEvent } from '@privateaim/server-analysis-manager-kit';
import type { CoreDestroyCommandContext } from '@privateaim/server-analysis-manager-kit';
import { buildCoreAggregatorQueuePayload } from '../utils';

export async function writeDestroyedEvent(
    context: CoreDestroyCommandContext,
) {
    const client = useAmqpClient();
    await client.publish(buildCoreAggregatorQueuePayload({
        event: CoreEvent.DESTROYED,
        command: context.command,
        data: context.data,
    }));

    return context.data;
}
