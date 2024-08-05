/*
 * Copyright (c) 2021-2024.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { MasterImageCommand } from '@privateaim/core-kit';
import { BadRequestError, NotFoundError } from '@ebec/http';
import { MemoryCache } from '@privateaim/server-kit';
import { useRequestBody } from '@routup/basic/body';
import { sendAccepted } from 'routup';
import type { Request, Response } from 'routup';
import { MemoryCacheID } from '../../../../../constants';
import { runMasterImagesSynchronizeCommand } from '../../../../../domains';

export async function commandMasterImageRouteHandler(req: Request, res: Response) {
    const body = useRequestBody(req);

    if (
        !body ||
        Object.values(MasterImageCommand).indexOf(body.command) === -1
    ) {
        throw new BadRequestError('The master image command is not valid.');
    }

    const memoryCache = new MemoryCache();

    const { command } = body;

    switch (command) {
        case MasterImageCommand.SYNC: {
            if (memoryCache.has(MemoryCacheID.MASTER_IMAGES)) {
                throw new BadRequestError('A master images synchronization process is already in progress.');
            }

            await runMasterImagesSynchronizeCommand()
                .then(() => {
                    memoryCache.set(MemoryCacheID.MASTER_IMAGES, {
                        ttl: 1000 * 60 * 15, // 15 minutes
                    });
                });

            return sendAccepted(res);
        }
    }

    throw new NotFoundError();
}
