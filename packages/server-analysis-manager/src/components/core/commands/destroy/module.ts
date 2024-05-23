/*
 * Copyright (c) 2023-2024.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { AnalysisFileType, buildAnalysisFileBucketName } from '@privateaim/core';
import { isClientErrorWithStatusCode } from 'hapic';
import { CoreCommand } from '@privateaim/server-analysis-manager-kit';
import type { CoreDestroyPayload } from '@privateaim/server-analysis-manager-kit';
import { useStorageClient } from '../../../../core';
import { useCoreLogger } from '../../utils';

export async function executeCoreDestroyCommand(
    payload: CoreDestroyPayload,
) : Promise<CoreDestroyPayload> {
    const logger = useCoreLogger();
    const storage = useStorageClient();

    logger.debug('Destroying analysis buckets...', {
        command: CoreCommand.CONFIGURE,
    });

    const names = [
        buildAnalysisFileBucketName(AnalysisFileType.CODE, payload.id),
        buildAnalysisFileBucketName(AnalysisFileType.TEMP, payload.id),
        buildAnalysisFileBucketName(AnalysisFileType.RESULT, payload.id),
    ];

    for (let i = 0; i < names.length; i++) {
        try {
            await storage.bucket.delete(names[i]);
        } catch (e) {
            if (isClientErrorWithStatusCode(e, [404, 409])) {
                continue;
            }

            throw e;
        }
    }

    logger.debug('Destroyed analysis buckets...', {
        command: CoreCommand.CONFIGURE,
    });

    return payload;
}
