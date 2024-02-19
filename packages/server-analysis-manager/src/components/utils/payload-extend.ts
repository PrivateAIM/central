/*
 * Copyright (c) 2022-2024.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { hasOwnProperty } from '@privateaim/core';
import type {
    APIClient, Analysis, Registry,
} from '@privateaim/core';
import { isClientErrorWithStatusCode, useClient } from 'hapic';
import { BaseError } from '../error';
import type { ComponentPayloadExtended } from '../type';

export async function extendPayload<T extends Partial<ComponentPayloadExtended<{ id: Analysis['id'] }>>>(
    data: T,
) : Promise<ComponentPayloadExtended<T>> {
    let train : Analysis;
    let registry: Registry;

    // -----------------------------------------------------------------------------------

    const client = useClient<APIClient>();

    if (data.entity) {
        train = data.entity;
    } else {
        try {
            train = await client.analysis.getOne(data.id);
        } catch (e) {
            if (isClientErrorWithStatusCode(e, 404)) {
                throw BaseError.notFound({
                    cause: e,
                });
            }

            throw e;
        }
    }

    if (data.registry) {
        registry = data.registry;
    } else {
        try {
            registry = await client.registry.getOne(train.registry_id, {
                fields: ['+account_secret'],
            });
        } catch (e) {
            if (isClientErrorWithStatusCode(e, 404)) {
                throw BaseError.registryNotFound({
                    cause: e,
                });
            }

            throw e;
        }
    }

    return {
        ...data,
        entity: train,
        registry,
    };
}

export function cleanupPayload<T extends Record<string, any>>(payload: T): T {
    if (hasOwnProperty(payload, 'entity')) {
        delete payload.entity;
    }

    if (hasOwnProperty(payload, 'registry')) {
        delete payload.registry;
    }

    if (hasOwnProperty(payload, 'registryProject')) {
        delete payload.registryProject;
    }

    return payload;
}
