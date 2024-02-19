/*
 * Copyright (c) 2021-2024.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { nullifyEmptyObjectProperties } from '../../utils';
import { BaseAPI } from '../base';
import type { RegistryAPICommand } from './registry';
import { ServiceID } from './constants';
import type { SingleResourceResponse } from '../types-base';
import type { Registry } from '../registry';
import type { RegistryProject } from '../registry-project';

export class ServiceAPI extends BaseAPI {
    async runCommand(
        id: `${ServiceID}`,
        command: string,
        data?: Record<string, any>,
    ): Promise<SingleResourceResponse<Record<string, any>>> {
        data = data || {};

        const { data: resultData } = await this.client.post(`services/${id}/command`, nullifyEmptyObjectProperties({ command, ...data }));

        return resultData;
    }

    async runRegistryCommand(
        command: `${RegistryAPICommand}`,
        data: {
            id: Registry['id'] | RegistryProject['id'],
            [key: string]: any
        },
    ): Promise<SingleResourceResponse<Record<string, any>>> {
        return this.runCommand(ServiceID.REGISTRY, command, data);
    }
}
