/*
 * Copyright (c) 2022-2024.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type { Robot } from '@authup/core-kit';
import { stringifyAuthorizationHeader } from 'hapic';
import type { HarborClient, ProjectWebhookTarget } from '@hapic/harbor';
import { createClient } from '@hapic/harbor';
import { ServiceID } from '@privateaim/core-kit';

export function buildRegistryWebhookTarget(
    context: {
        robot: Pick<Robot, 'id' | 'secret'>,
        url: string
    },
) : ProjectWebhookTarget {
    return {
        auth_header: stringifyAuthorizationHeader({
            type: 'Basic',
            username: context.robot.id,
            password: context.robot.secret,
        }),
        skip_cert_verify: true,
        address: `${context.url}services/${ServiceID.REGISTRY}/hook`,
        type: 'http',
    };
}

export function createBasicHarborAPIClient(connectionString: string) : HarborClient {
    // todo: use proxy config in the future...
    return createClient({
        connectionString,
    });
}
