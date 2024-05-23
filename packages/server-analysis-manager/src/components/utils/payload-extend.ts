/*
 * Copyright (c) 2022-2024.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { hasOwnProperty } from '@privateaim/core';
import type {
    Analysis, Registry,
} from '@privateaim/core';
import { isClientErrorWithStatusCode } from 'hapic';
import { useCoreClient } from '../../core';
import { BaseError } from '../error';
import type { ComponentPayloadExtended } from '../type';

export async function extendPayload<T extends Partial<ComponentPayloadExtended<{ id: Analysis['id'] }>>>(
    data: T,
    component: string,
) : Promise<ComponentPayloadExtended<T>> {
    let entity : Analysis;
    let registry: Registry;

    // -----------------------------------------------------------------------------------

    const client = useCoreClient();

    if (data.entity) {
        entity = data.entity;
    } else {
        try {
            entity = await client.analysis.getOne(data.id);
        } catch (e) {
            if (isClientErrorWithStatusCode(e, 404)) {
                throw BaseError.notFound({
                    cause: e,
                    component,
                });
            }

            throw e;
        }
    }

    if (data.registry) {
        registry = data.registry;
    } else {
        try {
            registry = await client.registry.getOne(entity.registry_id, {
                fields: ['+account_secret'],
            });
        } catch (e) {
            if (isClientErrorWithStatusCode(e, 404)) {
                throw BaseError.registryNotFound({
                    cause: e,
                    component,
                });
            }

            throw e;
        }
    }

    return {
        ...data,
        entity,
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

    return payload;
}
