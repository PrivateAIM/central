/*
 * Copyright (c) 2021.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { STATION_SECRET_ENGINE_KEY } from './constants';

export function isSecretStorageStationKey(name: string): boolean {
    return name.startsWith(`${STATION_SECRET_ENGINE_KEY}/`);
}

export function getSecretStorageStationKey(name: string): string {
    return name.replace(`${STATION_SECRET_ENGINE_KEY}/`, '');
}

export function buildSecretStorageStationKey(id: string | number): string {
    return `${STATION_SECRET_ENGINE_KEY}/${id}`;
}
