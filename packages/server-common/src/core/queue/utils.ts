/*
 * Copyright (c) 2023.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { hasOwnProperty, isObject } from 'smob';
import type { QueueEventPayload, QueuePayload } from './type';

export function isQueuePayload(input: unknown) : input is QueuePayload {
    return isObject(input) &&
        hasOwnProperty(input, 'data') &&
        isObject(input.data) &&
        hasOwnProperty(input, 'metadata') &&
        isObject(input.metadata);
}

export function isQueuePayloadWithError(input: unknown) : input is QueueEventPayload {
    return isObject(input) &&
        hasOwnProperty(input, 'error') &&
        isObject(input.error) &&
        typeof input.error.message === 'string' &&
        typeof input.error.code === 'string' &&
        (!hasOwnProperty(input.error, 'step') || typeof input.error.step === 'string');
}
