/*
 * Copyright (c) 2024.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type { TokenCreatorOptions } from '@authup/core';
import type { TokenVerifierRedisCacheOptions } from '@authup/server-adapter';
import { createHTTPMiddleware } from '@authup/server-adapter';
import { useRequestCookie } from '@routup/basic/cookie';
import { parseAuthorizationHeader } from 'hapic';
import type { Router } from 'routup';
import { coreHandler, getRequestHeader } from 'routup';
import type { AuthupMiddlewareRegistrationOptions } from './types';
import { applyTokenVerificationData, createFakeTokenVerificationData } from './utils';

export function registerAuthupMiddleware(
    router: Router,
    options: AuthupMiddlewareRegistrationOptions,
) {
    if (!options.client) {
        const data = createFakeTokenVerificationData();

        router.use(coreHandler((req, res, next) => {
            applyTokenVerificationData(req, data, true);
            next();
        }));

        return;
    }

    let cache : Record<string, string> = {};

    setInterval(() => {
        cache = {};
    }, 120 * 1000);

    router.use(coreHandler(async (req, res, next) => {
        const headerRaw = getRequestHeader(req, 'authorization');
        if (typeof headerRaw !== 'string') {
            next();
        }

        if (cache[headerRaw]) {
            req.headers.authorization = `Bearer ${cache[headerRaw]}`;
            next();
            return;
        }

        const header = parseAuthorizationHeader(headerRaw);

        if (header.type === 'Basic') {
            const token = await options.client.token.createWithPasswordGrant({
                username: header.username,
                password: header.password,
            });

            cache[headerRaw] = token.access_token;
            req.headers.authorization = `Bearer ${token.access_token}`;
        }

        next();
    }));

    let tokenCreator : TokenCreatorOptions;
    if (options.vaultClient) {
        tokenCreator = {
            type: 'robotInVault',
            name: 'system',
            vault: options.vaultClient,
            baseURL: options.client.getBaseURL(),
        };
    } else {
        tokenCreator = {
            type: 'user',
            name: 'admin',
            password: 'start123',
            baseURL: options.client.getBaseURL(),
        };
    }

    let tokenCache : TokenVerifierRedisCacheOptions | undefined;
    if (options.redisClient) {
        tokenCache = {
            type: 'redis',
            client: options.redisClient,
        };
    }

    const middleware = createHTTPMiddleware({
        tokenByCookie: (req, cookieName) => useRequestCookie(req, cookieName),
        tokenVerifier: {
            baseURL: options.client.getBaseURL(),
            creator: tokenCreator,
            cache: tokenCache,
        },
        tokenVerifierHandler: (
            req,
            data,
        ) => applyTokenVerificationData(req, data, false),
    });

    router.use(coreHandler((
        req,
        res,
        next,
    ) => middleware(req, res, next)));
}
