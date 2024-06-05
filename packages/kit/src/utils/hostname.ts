/*
 * Copyright (c) 2022-2024.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

export function getHostNameFromString(value: string) : string {
    if (
        value.startsWith('http://') ||
        value.startsWith('https://')
    ) {
        const url = new URL(value);
        value = url.hostname;
    }

    return value;
}
