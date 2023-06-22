/*
 * Copyright (c) 2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { Timeago } from '@vue-layout/timeago';
import type { PropType, VNodeArrayChildren } from 'vue';
import { defineComponent } from 'vue';
import type {
    Train,
} from '@personalhealthtrain/central-common';
import {
    PermissionID,
} from '@personalhealthtrain/central-common';
import { NuxtLink } from '#components';
import { useAuthStore } from '../../../store/auth';
import type { TrainDetailsSlotProps } from './TrainDetails';
import TrainDetails from './TrainDetails';
import TrainPipeline from './TrainPipeline.vue';
import TrainStationsProgress from '../train-station/TrainStationsProgress.vue';
import TrainName from './TrainName';
import EntityDelete from '../EntityDelete';

export default defineComponent({
    name: 'TrainItem',
    components: {
        TrainName,
        TrainStationsProgress,
        TrainPipeline,
    },
    props: {
        entity: {
            type: Object as PropType<Train>,
            required: true,
        },
    },
    emits: ['updated', 'deleted', 'failed'],
    setup(props, { emit }) {
        const store = useAuthStore();

        const extendedView = ref(false);
        const toggleView = () => {
            extendedView.value = !extendedView.value;
        };

        return () => h(TrainDetails, {
            entity: props.entity,
            onDeleted(entity) {
                emit('deleted', entity);
            },
            onUpdated(entity) {
                emit('updated', entity);
            },
            onFailed(e) {
                emit('failed', e);
            },
        }, {
            default: (props: TrainDetailsSlotProps) => {
                let deleteButton : VNodeArrayChildren = [];

                if (store.has(PermissionID.TRAIN_DROP)) {
                    deleteButton = [
                        h(EntityDelete, {
                            withText: false,
                            entityId: props.data.id,
                            entityType: 'train',
                            class: 'btn btn-danger btn-xs ms-1',
                            onDeleted(data: any) {
                                props.deleted(data);
                            },
                        }),
                    ];
                }

                return h(
                    'div',
                    {
                        class: 'train-card',
                    },
                    [
                        h(
                            'div',
                            {
                                class: 'train-card-content align-items-center',
                            },
                            [
                                h('div', [
                                    h(
                                        TrainName,
                                        {
                                            entityId: props.data.id,
                                            entityName: props.data.name,
                                            editable: true,
                                            onUpdated(item: Train) {
                                                props.updated(item);
                                            },
                                        },
                                        {
                                            default: (nameProps: any) => {
                                                let trainName : VNodeArrayChildren = [];

                                                if (nameProps.entityName) {
                                                    trainName = [
                                                        h(
                                                            'span',
                                                            {
                                                                class: 'text-muted ms-1',
                                                            },
                                                            nameProps.entityId,
                                                        ),
                                                    ];
                                                }

                                                return [
                                                    h('i', { class: 'fa-solid fa-train-tram me-1' }),
                                                    h(NuxtLink, {
                                                        to: `/trains/${nameProps.entityId}`,
                                                    }, [
                                                        nameProps.nameDisplay,
                                                    ]),
                                                    trainName,
                                                ];
                                            },
                                        },
                                    ),
                                ]),
                                h('div', { class: 'ms-auto' }, [
                                    h('button', {
                                        class: 'btn btn-dark btn-xs',
                                        onClick(event: any) {
                                            event.preventDefault();

                                            toggleView();
                                        },
                                    }, [
                                        h('i', {
                                            class: ['fa', {
                                                'fa-chevron-down': !extendedView.value,
                                                'fa-chevron-up': extendedView.value,
                                            }],
                                        }),
                                    ]),
                                    h(NuxtLink, {
                                        class: 'btn btn-dark btn-xs ms-1',
                                        type: 'button',
                                        to: `/trains/${props.data.id}`,
                                    }, [
                                        h('i', { class: 'fa fa-bars' }),
                                    ]),
                                    deleteButton,
                                ]),
                            ],
                        ),
                        h('hr', {
                            class: 'mt-1 mb-1',
                        }),
                        h(TrainPipeline, {
                            entity: props.data,
                            withCommand: extendedView.value,
                            listDirection: extendedView.value ? 'column' : 'row',
                            onUpdated(item: Train) {
                                props.updated(item);
                            },
                            onFailed(error: Error) {
                                props.failed(error);
                            },
                            onDeleted() {
                                props.deleted();
                            },
                        }),
                        h(TrainStationsProgress, {
                            class: 'mt-1 mb-1',
                            entity: props.data.id,
                            elementType: 'progress-bar',
                        }),
                        h('div', {
                            class: 'train-card-footer',
                        }, [
                            h('div', [
                                h('small', [
                                    h('span', { class: 'text-muted' }, 'updated'),
                                    ' ',
                                    h(Timeago, { datetime: props.data.updated_at }),
                                ]),
                            ]),
                        ]),
                    ],
                );
            },
        });
    },
});