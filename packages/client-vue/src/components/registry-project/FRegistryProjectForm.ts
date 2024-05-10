/*
 * Copyright (c) 2022-2024.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { buildFormSubmitWithTranslations, createFormSubmitTranslations } from '@authup/client-web-kit';
import { getSeverity, useTranslationsForNestedValidations } from '@ilingo/vuelidate';
import type { Registry, RegistryProject } from '@privateaim/core';
import { DomainType, RegistryProjectType, createNanoID } from '@privateaim/core';
import {
    buildFormGroup, buildFormInput, buildFormSelect,
} from '@vuecs/form-controls';
import type { ListItemSlotProps } from '@vuecs/list-controls';
import useVuelidate from '@vuelidate/core';
import {
    helpers, maxLength, minLength, required,
} from '@vuelidate/validators';
import type { PropType, VNodeArrayChildren } from 'vue';
import {
    computed, defineComponent, h, reactive, ref, watch,
} from 'vue';
import { useUpdatedAt } from '../../composables';
import {
    EntityListSlotName, createEntityManager, initFormAttributesFromSource, wrapFnWithBusyState,
} from '../../core';
import RegistryList from '../registry/FRegistries';

// todo: must start with character or number!!
const alphaNumHyphenUnderscore = helpers.regex(
    /^[a-z0-9-_]*$/,
);

export default defineComponent({
    props: {
        entity: {
            type: Object as PropType<RegistryProject>,
            default: undefined,
        },
        registryId: {
            type: String as PropType<Registry['id']>,
            default: undefined,
        },
    },
    emit: ['created', 'updated', 'failed'],
    setup(props, setup) {
        const busy = ref(false);
        const form = reactive({
            external_name: '',
            name: '',
            type: RegistryProjectType.DEFAULT,
            registry_id: '',
        });

        const $v = useVuelidate({
            name: {
                required,
                minLength: minLength(3),
                maxLength: maxLength(128),
            },
            external_name: {
                required,
                alphaNumHyphenUnderscore,
                minLength: minLength(3),
                maxLength: maxLength(64),
            },
            type: {
                required,
            },
            registry_id: {
                required,
            },
        }, form);

        const manager = createEntityManager({
            type: `${DomainType.REGISTRY_PROJECT}`,
            setup,
            props,
        });

        const types = [
            { id: RegistryProjectType.DEFAULT, value: 'DEFAULT' },
            { id: RegistryProjectType.NODE, value: 'Node' },
            { id: RegistryProjectType.AGGREGATOR, value: 'Aggregator' },
            { id: RegistryProjectType.INCOMING, value: 'Incoming' },
            { id: RegistryProjectType.OUTGOING, value: 'Outgoing' },
            { id: RegistryProjectType.MASTER_IMAGES, value: 'Master-Images' },
        ];

        const isRegistryLocked = computed(
            () => !!props.registryId,
        );

        const isExternalNameUnchanged = computed(() => {
            if (!manager.data.value || !manager.data.value.external_name) {
                return true;
            }

            return manager.data.value.external_name !== form.external_name;
        });

        const toggleForm = (key: keyof typeof form, id: any) => {
            if (form[key] === id) {
                form[key] = null as any;
            } else {
                form[key] = id;
            }
        };

        const generateAlias = () => {
            form.external_name = createNanoID();
        };

        const resetAlias = () => {
            if (!manager.data.value) return;

            form.external_name = manager.data.value.external_name;
        };

        const initFromProperties = () => {
            if (props.registryId) {
                form.registry_id = props.registryId;
            }

            if (typeof manager.data.value === 'undefined') {
                generateAlias();
            }

            initFormAttributesFromSource(form, manager.data.value);
        };

        const updatedAt = useUpdatedAt(props.entity);

        initFromProperties();

        watch(updatedAt, (val, oldValue) => {
            if (val && val !== oldValue) {
                initFromProperties();
            }
        });

        const submit = wrapFnWithBusyState(busy, async () => {
            if ($v.value.$invalid) {
                return;
            }

            await manager.createOrUpdate(form);
        });

        const translationsValidation = useTranslationsForNestedValidations($v.value);
        const translationsSubmit = createFormSubmitTranslations();

        return () => {
            const name = buildFormGroup({
                validationMessages: translationsValidation.name.value,
                validationSeverity: getSeverity($v.value.name),
                label: true,
                labelContent: 'Name',
                content: buildFormInput({
                    value: form.name,
                    onChange(input) {
                        form.name = input;
                    },
                }),
            });
            const externalName = buildFormGroup({
                validationMessages: translationsValidation.external_name.value,
                validationSeverity: getSeverity($v.value.external_name),
                label: true,
                labelContent: 'External Name',
                content: buildFormInput({
                    value: form.external_name,
                    onChange(input) {
                        form.external_name = input;
                    },
                }),
            });

            const externalNameHint = h('div', {
                class: ['alert alert-sm', {
                    'alert-danger': !isExternalNameUnchanged.value,
                    'alert-info': isExternalNameUnchanged.value,
                }],
            }, [
                h('div', { class: 'mb-1' }, [
                    (!isExternalNameUnchanged.value ?
                        'If you change the external_name, a new representation will be created in the Registry.' :
                        'If you don\'t want to chose a external_name by your own, you can generate one.'
                    ),
                ]),
                h('button', {
                    class: 'btn btn-xs btn-dark',
                    type: 'button',
                    onClick($event: any) {
                        $event.preventDefault();

                        generateAlias();
                    },
                }, [
                    h('i', { class: 'fa fa-wrench pe-1' }),
                    'Generate',
                ]),
                h('button', {
                    class: 'btn btn-xs btn-dark ms-1',
                    type: 'button',
                    disabled: isExternalNameUnchanged.value,
                    onClick($event: any) {
                        $event.preventDefault();

                        resetAlias();
                    },
                }, [
                    h('i', { class: 'fa fa-undo pe-1' }),
                    'Reset',
                ]),
            ]);

            const type = buildFormGroup({
                validationMessages: translationsValidation.type.value,
                validationSeverity: getSeverity($v.value.type),
                label: true,
                labelContent: 'Type',
                content: buildFormSelect({
                    value: form.type,
                    options: types,
                    onChange(input) {
                        form.type = input;
                    },
                }),
            });

            let registry : VNodeArrayChildren = [];

            if (!isRegistryLocked.value) {
                registry = [
                    h('hr'),
                    h(RegistryList, {
                        [EntityListSlotName.ITEM_ACTIONS]: (props: ListItemSlotProps<Registry>) => h('button', {
                            attrs: {
                                disabled: props.busy,
                            },
                            class: ['btn btn-xs', {
                                'btn-dark': form.registry_id !== props.data.id,
                                'btn-warning': form.registry_id === props.data.id,
                            }],
                            onClick($event: any) {
                                $event.preventDefault();

                                toggleForm('registry_id', props.data.id);
                            },
                        }, [
                            h('i', {
                                class: {
                                    'fa fa-plus': form.registry_id !== props.data.id,
                                    'fa fa-minus': form.registry_id === props.data.id,
                                },
                            }),
                        ]),
                    }),
                ];
            }

            const submitNode = buildFormSubmitWithTranslations({
                submit,
                busy: busy.value,
                isEditing: !!manager.data.value,
                invalid: $v.value.$invalid,
            }, translationsSubmit);

            return h('form', {
                onSubmit($event: any) {
                    $event.preventDefault();

                    return submit();
                },
            }, [
                type,
                h('hr'),
                name,
                h('hr'),
                externalName,
                externalNameHint,
                registry,
                h('hr'),
                submitNode,
            ]);
        };
    },
});
