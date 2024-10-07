/*
 * Copyright (c) 2024.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type { RequestIdentity } from '@privateaim/server-http-kit';
import type { BucketEntity } from './entity';

export function isBucketOwnedByIdentity(entity: BucketEntity, actor: RequestIdentity) {
    return entity.actor_type === actor.type &&
        entity.actor_id === actor.id;
}

export function toBucketName(input: string) : string {
    input = input
        .toLowerCase()
        .replace(/[^a-z0-9.-]/g, '');

    return input.slice(0, Math.min(63, input.length));
}
