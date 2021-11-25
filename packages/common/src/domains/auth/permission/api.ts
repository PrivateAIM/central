/*
 * Copyright (c) 2021-2021.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { BuildInput, buildQuery } from '@trapi/query';
import { APIType, SingleResourceResponse, useAPI } from '../../../modules';
import { Permission } from './entity';

export async function getPermissions(data?: BuildInput<Permission>) {
    const response = await useAPI(APIType.DEFAULT).get(`permissions${buildQuery(data)}`);
    return response.data;
}

export async function addAPIPermission(data: Pick<Permission, 'id'>) : Promise<SingleResourceResponse<Permission>> {
    const response = await useAPI(APIType.DEFAULT).post('permissions', data);

    return response.data;
}

export async function editAPIPermission(id: typeof Permission.prototype.id, data: Pick<Permission, 'id'>) : Promise<SingleResourceResponse<Permission>> {
    const response = await useAPI(APIType.DEFAULT).post(`permissions/${id}`, data);

    return response.data;
}
