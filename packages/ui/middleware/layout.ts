/*
 * Copyright (c) 2021-2021.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type { Context } from '@nuxt/types';
import {
    build,
} from '@vue-layout/navigation';

export default async function layoutMiddleware({ route } : Context) {
    await build({ url: route.fullPath });
}
