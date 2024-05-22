/*
 * Copyright (c) 2021-2024.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { useLogger } from '@authup/server-kit';
import { RegistryCommand } from './constants';
import {
    dispatchRegistryEventToTrainManager,
    linkRegistryProject,
    relinkRegistryProject,
    setupRegistry,
    unlinkRegistryProject,
} from './handlers';
import { cleanupRegistry } from './handlers/cleanup';
import type { RegistryCommandContext } from './type';

export async function executeRegistryCommand(context: RegistryCommandContext) {
    switch (context.command) {
        case RegistryCommand.SETUP: {
            useLogger()
                .info('registry setup initialised', { component: 'registry', id: context.data.id });

            try {
                await setupRegistry(context.data);

                useLogger()
                    .info('registry setup completed', { component: 'registry', id: context.data.id });
            } catch (e) {
                useLogger()
                    .warn('registry setup failed', { component: 'registry', id: context.data.id });

                useLogger().error(e);
            }
            break;
        }
        case RegistryCommand.CLEANUP: {
            useLogger()
                .info('registry cleanup initialised', { component: 'registry', id: context.data.id });

            try {
                await cleanupRegistry(context.data);

                useLogger()
                    .info('registry cleanup completed', { component: 'registry', id: context.data.id });
            } catch (e) {
                useLogger()
                    .error('registry cleanup failed', { component: 'registry', id: context.data.id });

                useLogger().error(e);
            }
            break;
        }
        case RegistryCommand.DELETE: {
            break;
        }
        case RegistryCommand.PROJECT_LINK: {
            useLogger()
                .info('registry project link initialised', { component: 'registry', id: context.data.id });

            try {
                await linkRegistryProject(context.data);

                useLogger()
                    .info('registry project link completed', { component: 'registry', id: context.data.id });
            } catch (e) {
                useLogger()
                    .warn('registry project link failed', { component: 'registry', id: context.data.id });

                useLogger().error(e);
            }
            break;
        }
        case RegistryCommand.PROJECT_UNLINK: {
            useLogger()
                .info('registry project unlink initialised', { component: 'registry', id: context.data.id });

            try {
                await unlinkRegistryProject(context.data);

                useLogger()
                    .info('registry project unlink completed', { component: 'registry', id: context.data.id });
            } catch (e) {
                useLogger()
                    .warn('registry project unlink failed', { component: 'registry', id: context.data.id });

                useLogger().error(e);
            }
            break;
        }
        case RegistryCommand.PROJECT_RELINK: {
            useLogger()
                .info('registry project relink initialised', { component: 'registry', id: context.data.id });

            try {
                await relinkRegistryProject(context.data);

                useLogger()
                    .info('registry project relink completed', { component: 'registry', id: context.data.id });
            } catch (e) {
                useLogger()
                    .warn('registry project relink failed', { component: 'registry', id: context.data.id });

                useLogger().error(e);
            }

            break;
        }
        case RegistryCommand.EVENT_HANDLE: {
            try {
                await dispatchRegistryEventToTrainManager(context.data);
                useLogger()
                    .info('registry project event handled.', { component: 'registry', id: context.data.event });
            } catch (e) {
                useLogger()
                    .warn('registry project event handle failed.', { component: 'registry', id: context.data.event });

                useLogger().error(e);
            }
        }
    }
}
