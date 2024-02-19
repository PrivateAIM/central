/*
 * Copyright (c) 2022-2024.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type { APIClient } from '@privateaim/core';
import type { APIClient as AuthupAPIClient } from '@authup/core';
import { useNuxtApp } from '#app';

export function useAPI() : APIClient {
    return useNuxtApp().$api;
}

export function useAuthupAPI(): AuthupAPIClient {
    return useNuxtApp().$authupAPI;
}
