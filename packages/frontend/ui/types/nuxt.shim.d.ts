/*
 * Copyright (c) 2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { HTTPClient } from '@personalhealthtrain/central-common';
import { HTTPClient as AuthHTTPClient } from '@typescript-auth/domains/dist/http/client/module';
import AuthModule from '../config/auth';
import {Store} from "vuex";
import {SocketModule} from "../config/socket";
import {BrowserStorageAdapter} from "browser-storage-adapter";

declare module '@nuxt/types' {
    // nuxtContext.app.$myInjectedFunction inside asyncData, fetch, plugins, middleware, nuxtServerInit
    interface NuxtAppOptions {
        $store: Store<any>,
    }

    // nuxtContext.$myInjectedFunction
    interface Context {
        $warehouse: BrowserStorageAdapter,
        $authWarehouse: BrowserStorageAdapter,

        $api: HTTPClient,
        $authApi: AuthHTTPClient,

        $auth: AuthModule,

        $store: Store<any>,

        $socket: SocketModule
    }
}
