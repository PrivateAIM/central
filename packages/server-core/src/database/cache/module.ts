/*
 * Copyright (c) 2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type { QueryResultCache } from 'typeorm/cache/QueryResultCache';
import type { QueryResultCacheOptions } from 'typeorm/cache/QueryResultCacheOptions';
import { hasRedisClient, useRedisClient } from '../../core';

type DatabaseQueryResultCacheOptions = {
    redisAlias?: string,

    redisKeyPrefix?: string
};

export class DatabaseQueryResultCache implements QueryResultCache {
    protected options: DatabaseQueryResultCacheOptions;

    constructor(options?: DatabaseQueryResultCacheOptions) {
        options = options || {};

        this.options = options;
    }

    protected buildFullQualifiedId(id: string) {
        if (this.options.redisKeyPrefix) {
            return `${this.options.redisKeyPrefix}:${id}`;
        }

        return `database:${id}`;
    }

    protected clearQuery(query: string) {
        return query.replace(/[^a-zA-Z0-9_-]+/g, '');
    }

    async clear(): Promise<void> {
        if (!hasRedisClient()) {
            return;
        }

        const client = useRedisClient();
        const pipeline = client.pipeline();

        const keys = await client.keys(this.buildFullQualifiedId('*'));
        for (let i = 0; i < keys.length; i++) {
            pipeline.del(keys[i]);
        }

        await pipeline.exec();
    }

    async connect(): Promise<void> {
        return Promise.resolve(undefined);
    }

    async disconnect(): Promise<void> {
        return Promise.resolve(undefined);
    }

    async getFromCache(options: QueryResultCacheOptions): Promise<QueryResultCacheOptions | undefined> {
        if (!hasRedisClient()) {
            return undefined;
        }

        // todo: allow options.query

        if (!options.identifier) {
            return undefined;
        }

        const key = this.buildFullQualifiedId(options.identifier || options.query);
        const client = useRedisClient();

        const data = await client.get(
            key,
        );

        if (!data) {
            return undefined;
        }

        return JSON.parse(data);
    }

    isExpired(savedCache: QueryResultCacheOptions): boolean {
        if (typeof savedCache.time === 'undefined') {
            return true;
        }

        return savedCache.time + savedCache.duration < new Date().getTime();
    }

    async remove(identifiers: string[]): Promise<void> {
        if (!hasRedisClient()) {
            return;
        }

        const client = useRedisClient();
        const pipeline = client.pipeline();

        for (let i = 0; i < identifiers.length; i++) {
            pipeline.del(this.buildFullQualifiedId(identifiers[i]));
        }

        await pipeline.exec();
    }

    async storeInCache(
        options: QueryResultCacheOptions,
    ): Promise<void> {
        if (!hasRedisClient()) {
            return;
        }

        // todo: allow options.query

        if (!options.identifier) {
            return;
        }

        const key = this.buildFullQualifiedId(options.identifier || options.query);
        const client = useRedisClient();

        await client.set(
            key,
            JSON.stringify(options),
            'PX',
            options.duration,
        );
    }

    synchronize(): Promise<void> {
        return Promise.resolve(undefined);
    }
}
