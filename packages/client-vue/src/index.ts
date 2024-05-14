/*
 * Copyright (c) 2023-2024.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { applyStoreManagerOptions, installStoreManager } from '@vuecs/list-controls/core';
import type { App, Component, Plugin } from 'vue';
import './css';
import * as components from './components';
import type { Options } from './type';
import {
    provideCoreAPIClient,
    provideSocketManager,
    provideStorageAPIClient,
} from './core';

export function install(instance: App, options: Options = {}) : void {
    if (options.coreAPIClient) {
        provideCoreAPIClient(options.coreAPIClient, instance);
    }

    if (options.storageAPIClient) {
        provideStorageAPIClient(options.storageAPIClient, instance);
    }

    if (options.socketManager) {
        provideSocketManager(options.socketManager, instance);
    }

    const storeManager = installStoreManager(instance);
    if (options.storeManager) {
        applyStoreManagerOptions(storeManager, options.storeManager);
    }

    if (options.components) {
        let componentsSelected : undefined | string[];
        if (typeof options.components !== 'boolean') {
            componentsSelected = options.components;
        }

        Object.entries(components)
            .forEach(([componentName, component]) => {
                if (
                    !Array.isArray(componentsSelected) ||
                    componentsSelected.indexOf(componentName) !== -1
                ) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    instance.component(componentName, component as Component);
                }
            });
    }
}

export default {
    install,
} satisfies Plugin<Options | undefined>;

export * from './components';
export * from './core';
export * from './type';
