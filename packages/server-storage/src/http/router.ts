/*
 * Copyright (c) 2024.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { decorators } from '@routup/decorators';
import {
    useRequestBody,
} from '@routup/basic/body';
import {
    useRequestCookie,
    useRequestCookies,
} from '@routup/basic/cookie';
import {
    useRequestQuery,
} from '@routup/basic/query';

import { Router, coreHandler } from 'routup';
import { BucketController, BucketFileController } from './controllers';
import { mountAuthupMiddleware } from './middlewares';

export function createHTTPRouter() : Router {
    const router = new Router();

    mountAuthupMiddleware(router);

    router.get('/', coreHandler(() => ({
        timestamp: Date.now(),
    })));

    router.use(decorators({
        controllers: [
            BucketController,
            BucketFileController,
        ],
        parameter: {
            body: (context, name) => {
                if (name) {
                    return useRequestBody(context.request, name);
                }

                return useRequestBody(context.request);
            },
            cookie: (context, name) => {
                if (name) {
                    return useRequestCookie(context.request, name);
                }

                return useRequestCookies(context.request);
            },
            query: (context, name) => {
                if (name) {
                    return useRequestQuery(context.request, name);
                }

                return useRequestQuery(context.request);
            },
        },
    }));

    return router;
}