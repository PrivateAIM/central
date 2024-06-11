/*
 * Copyright (c) 2021-2024.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type { BuildInput } from 'rapiq';
import { buildQuery } from 'rapiq';
import type { AnalysisBucket } from '@privateaim/core';
import { BaseAPI } from '../base';
import type { CollectionResourceResponse, SingleResourceResponse } from '../types-base';

export class AnalysisBucketAPI extends BaseAPI {
    async getMany(
        options?: BuildInput<AnalysisBucket>,
    ): Promise<CollectionResourceResponse<AnalysisBucket>> {
        const response = await this.client.get(`analysis-buckets${buildQuery(options)}`);

        return response.data;
    }

    async getOne(
        id: AnalysisBucket['id'],
    ): Promise<SingleResourceResponse<AnalysisBucket>> {
        const response = await this.client.get(`analysis-buckets/${id}`);

        return response.data;
    }
}