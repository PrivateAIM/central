/*
 * Copyright (c) 2023-2024.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type { EnvironmentName } from './constants';

export interface Environment {
    env: `${EnvironmentName}`,

    minioConnectionString: string,
    redisConnectionString: string,
    rabbitMqConnectionString: string,
    vaultConnectionString: string,

    apiUrl: string,
    authupApiUrl: string
}
