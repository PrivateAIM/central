/*
 * Copyright (c) 2023-2024.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { prometheus } from '@routup/prometheus';
import type { Router } from 'routup';

export function registerPrometheusMiddleware(router: Router) {
    router.use(prometheus());
}
