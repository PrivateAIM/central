/*
 * Copyright (c) 2023-2024.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { useStorageClient } from '../../../../core';
import type { CoreConfigurePayload } from '../../type';
import { buildMinioBucketName } from '../utils';

export async function executeCoreConfigureCommand(
    payload: CoreConfigurePayload,
) : Promise<CoreConfigurePayload> {
    const minio = useStorageClient();

    const bucketName = buildMinioBucketName(payload.id);
    const hasBucket = await minio.bucketExists(bucketName);
    if (!hasBucket) {
        await minio.makeBucket(bucketName, 'eu-west-1');
    }

    return payload;
}
