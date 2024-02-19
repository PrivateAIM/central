/*
 * Copyright (c) 2021-2024.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */
import {
    buildFormGroup, buildFormInput, buildFormSubmit, buildFormTextarea,
} from '@vuecs/form-controls';
import type { ListHeaderSlotProps, ListItemSlotProps } from '@vuecs/list-controls';
import useVuelidate from '@vuelidate/core';
import { maxLength, minLength, required } from '@vuelidate/validators';
import {
    defineComponent,
    h,
    reactive, ref,
    watch,
} from 'vue';
import type {
    PropType,
} from 'vue';

import type { MasterImage, Node, Project } from '@privateaim/core';
import { DomainType, ProposalRisk } from '@privateaim/core';
import { useUpdatedAt } from '../../composables';
import type { ListProps } from '../../core';
import {
    EntityListSlotName,
    createEntityManager,
    defineEntityManagerEvents,
    initFormAttributesFromSource,
    injectAPIClient,
    renderEntityAssignAction, useValidationTranslator, wrapFnWithBusyState,
} from '../../core';
import MasterImagePicker from '../master-image/MasterImagePicker';
import StationList from '../station/StationList';
import ProposalStationAssignAction from '../proposal-station/ProposalStationAssignAction';
import { FSearch } from '../utility';

export default defineComponent({
    props: {
        entity: {
            type: Object as PropType<Project>,
            default: undefined,
        },
    },
    emits: defineEntityManagerEvents<Project>(),
    setup(props, setup) {
        const apiClient = injectAPIClient();
        const busy = ref(false);
        const form = reactive({
            title: '',
            requested_data: '',
            master_image_id: '',
            risk: ProposalRisk.MID,
            risk_comment: '',
        });

        const $v = useVuelidate({
            title: {
                required,
                minLength: minLength(5),
                maxLength: maxLength(100),
            },
            requested_data: {
                required,
                minLength: minLength(10),
                maxLength: maxLength(2048),
            },
            master_image_id: {
                required,
            },
            risk: {
                required,
            },
            risk_comment: {
                required,
                minLength: minLength(10),
                maxLength: maxLength(2048),
            },
        }, form);

        const stationIds = ref<string[]>([]);

        const risks = [
            { id: ProposalRisk.LOW, name: '(Low) Low risk', class: 'btn-success' },
            { id: ProposalRisk.MID, name: '(Mid) Mid risk', class: 'btn-warning' },
            { id: ProposalRisk.HIGH, name: '(High) High risk', class: 'btn-danger' },
        ];

        const manager = createEntityManager({
            type: `${DomainType.PROJECT}`,
            setup,
            props,
        });

        const initFromProperties = () => {
            if (!manager.data.value) return;

            initFormAttributesFromSource(form, manager.data.value);
        };

        initFromProperties();

        const updatedAt = useUpdatedAt(props.entity);

        watch(updatedAt, (val, oldVal) => {
            if (val && val !== oldVal) {
                manager.data.value = props.entity;

                initFromProperties();
            }
        });

        const handleMasterImagePicker = (item: MasterImage) => {
            if (item) {
                form.master_image_id = item.id;
            } else {
                form.master_image_id = '';
            }
        };

        const submit = wrapFnWithBusyState(busy, async () => {
            if ($v.value.$invalid) return;

            const existed = !!manager.data.value;
            await manager.createOrUpdate(form);

            if (!existed && manager.data.value) {
                for (let i = 0; i < stationIds.value.length; i++) {
                    await apiClient.projectNode.create({
                        proposal_id: manager.data.value.id,
                        station_id: stationIds.value[i],
                    });
                }
            }
        });

        const toggleStationIds = (id: string) => {
            const index = stationIds.value.indexOf(id);
            if (index === -1) {
                stationIds.value.push(id);
            } else {
                stationIds.value.splice(index, 1);
            }
        };

        const toggleFormData = (key: keyof typeof form, id: any) => {
            if (form[key] === id) {
                form[key] = null as any;
            } else {
                form[key] = id;
            }
        };

        return () => {
            const title = buildFormGroup({
                validationTranslator: useValidationTranslator(),
                validationResult: $v.value.title,
                label: true,
                labelContent: 'Title',
                content: buildFormInput({
                    value: form.title,
                    onChange(input) {
                        form.title = input;
                    },
                }),
            });

            const masterImagePicker = h(MasterImagePicker, {
                entityId: form.master_image_id,
                onSelected(value: MasterImage) {
                    handleMasterImagePicker(value);
                },
            });

            const risk = h('div', [
                h('label', 'Risk'),
                h('div', { class: 'row  mt-1 mb-2' }, risks.map((value) => h('div', { class: 'col', key: value.id }, [
                    h('button', {
                        style: {
                            opacity: value.id === form.risk ? 1 : 0.5,
                        },
                        class: ['btn btn-block', {
                            [value.class]: true,
                            'font-weight-bold': value.id === form.risk,
                        }],
                        type: 'button',
                        onClick($event: any) {
                            $event.preventDefault();

                            toggleFormData('risk', value.id);
                        },
                    }, [
                        value.id,
                    ]),
                ]))),
                (!$v.value.risk.required ?
                    h('div', { class: 'alert alert-sm alert-warning' }, [
                        'Specify the possible risk for a station in general.',
                    ]) :
                    h('')
                ),
            ]);

            const riskComment = buildFormGroup({
                validationTranslator: useValidationTranslator(),
                validationResult: $v.value.risk_comment,
                label: true,
                labelContent: 'Risk Comment',
                content: buildFormTextarea({
                    value: form.risk_comment,
                    onChange(input) {
                        form.risk_comment = input;
                    },
                    props: {
                        rows: 6,
                    },
                }),
            });

            const submitNode = buildFormSubmit({
                submit,
                busy: busy.value,
                updateText: 'Update',
                createText: 'Create',
                isEditing: !!manager.data.value,
                validationResult: $v.value,
            });

            const stationsNode = h('div', [
                h(StationList, {
                    query: {
                        filters: {
                            hidden: false,
                        },
                    },
                } satisfies ListProps<Node>, {
                    [EntityListSlotName.HEADER]: (props: ListHeaderSlotProps<Node>) => [
                        h('label', 'Stations'),
                        h(FSearch, {
                            load: props.load,
                            meta: props.meta,
                        }),
                    ],
                    [EntityListSlotName.ITEM_ACTIONS]: (props: ListItemSlotProps<Node>) => {
                        if (manager.data.value) {
                            return h(ProposalStationAssignAction, {
                                stationId: props.data.id,
                                proposalId: manager.data.value.id,
                                realmId: manager.data.value.id,
                            });
                        }

                        const itemIndex = stationIds.value.indexOf(props.data.id);

                        return renderEntityAssignAction({
                            item: itemIndex === -1 ? undefined : stationIds.value[itemIndex],
                            add: () => toggleStationIds(props.data.id),
                            drop: () => toggleStationIds(props.data.id),
                        });
                    },
                }),
                h('div', { class: 'alert alert-dark alert-sm' }, [
                    'Chose a arbitrary amount of target stations.',
                ]),
            ]);

            const data = buildFormGroup({
                validationTranslator: useValidationTranslator(),
                validationResult: $v.value.requested_data,
                label: true,
                labelContent: 'Data/Parameters',
                content: buildFormTextarea({
                    value: form.requested_data,
                    onChange(input) {
                        form.requested_data = input;
                    },
                    props: {
                        rows: 6,
                    },
                }),
            });

            return h(
                'div',
                { class: 'row' },
                [
                    h(
                        'div',
                        { class: 'col' },
                        [
                            title,
                            h('hr'),
                            masterImagePicker,
                            h('hr'),
                            risk,
                            h('hr'),
                            riskComment,
                        ],
                    ),
                    h(
                        'div',
                        { class: 'col' },
                        [
                            stationsNode,
                            h('hr'),
                            data,
                            h('hr'),
                            submitNode,
                        ],
                    ),
                ],
            );
        };
    },
});
