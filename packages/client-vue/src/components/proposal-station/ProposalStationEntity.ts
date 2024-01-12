/*
 * Copyright (c) 2023-2023.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import {
    DomainSubType,
    DomainType,
    buildDomainChannelName,
} from '@personalhealthtrain/core';
import type {
    ProjectNode,
} from '@personalhealthtrain/core';
import type { FiltersBuildInput } from 'rapiq';
import {
    defineComponent, h,
} from 'vue';
import type {
    PropType,
    VNodeChild,
} from 'vue';
import { createEntityManager, defineEntityManagerEvents, injectAPIClient } from '../../core';

enum Direction {
    IN = 'in',
    OUT = 'out',
}

enum Target {
    PROPOSAL = 'proposal',
    STATION = 'station',
}

export default defineComponent({
    props: {
        entity: {
            type: Object as PropType<ProjectNode>,
        },
        entityId: {
            type: String,
        },
        queryFilters: {
            type: Object as PropType<FiltersBuildInput<ProjectNode>>,
        },
        direction: {
            type: String as PropType<`${Direction.IN}` | `${Direction.OUT}`>,
        },
        target: {
            type: String as PropType<`${Target.STATION}` | `${Target.PROPOSAL}`>,
        },
    },
    emits: defineEntityManagerEvents<ProjectNode>(),
    async setup(props, setup) {
        const apiClient = injectAPIClient();
        const manager = createEntityManager({
            realmId: (entity) => {
                if (!entity) {
                    return undefined;
                }

                if (props.target === Target.PROPOSAL) {
                    return entity.proposal_realm_id;
                }

                if (props.target === Target.STATION) {
                    return entity.station_realm_id;
                }

                return undefined;
            },
            type: `${DomainType.PROJECT_NODE}`,
            setup,
            props,
            socket: {
                processEvent(event, realmId) {
                    if (!realmId) {
                        return true;
                    }

                    if (props.target === Target.PROPOSAL) {
                        return realmId === event.data.station_realm_id;
                    }

                    if (props.target === Target.STATION) {
                        return realmId === event.data.proposal_realm_id;
                    }

                    return false;
                },
                buildChannelName(id) {
                    if (props.direction === Direction.IN) {
                        return buildDomainChannelName(DomainSubType.PROJECT_NODE_IN, id);
                    }

                    if (props.direction === Direction.OUT) {
                        return buildDomainChannelName(DomainSubType.PROJECT_NODE_OUT, id);
                    }

                    return buildDomainChannelName(DomainType.PROJECT_NODE, id);
                },
            },
        });

        await manager.resolve();

        if (
            manager.data.value &&
            props.target &&
            !manager.data.value[props.target]
        ) {
            if (props.target === Target.PROPOSAL) {
                manager.data.value[props.target] = await apiClient
                    .project.getOne(manager.data.value.proposal_id);
            } else {
                manager.data.value[props.target] = await apiClient
                    .station.getOne(manager.data.value.station_id);
            }
        }

        return () => {
            const fallback = () : VNodeChild => {
                if (
                    props.target &&
                    manager.data.value &&
                    manager.data.value[props.target]
                ) {
                    if (props.target === Target.PROPOSAL) {
                        return h('div', [
                            manager.data.value?.proposal.title,
                        ]);
                    }
                    if (props.target === Target.STATION) {
                        return h('div', [
                            manager.data.value?.station.name,
                        ]);
                    }
                }

                return [
                    manager.data?.value?.id,
                ];
            };

            return manager.render(fallback);
        };
    },
});
