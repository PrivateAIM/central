/*
 * Copyright (c) 2021-2023.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */
import { ARealms } from '@authup/client-vue';
import type { Registry, Node } from '@personalhealthtrain/core';
import {
    DomainType,
    alphaNumHyphenUnderscoreRegex, hexToUTF8, isHex,
} from '@personalhealthtrain/core';
import {
    buildFormGroup,
    buildFormInput, buildFormSelect, buildFormSubmit, buildFormTextarea,
} from '@vuecs/form-controls';
import type { ListBodySlotProps, ListItemSlotProps } from '@vuecs/list-controls';
import useVuelidate from '@vuelidate/core';
import {
    email, helpers, maxLength, minLength, required,
} from '@vuelidate/validators';
import type {
    PropType, VNodeArrayChildren,
} from 'vue';
import {
    computed, defineComponent, h, reactive, ref, watch,
} from 'vue';
import { useUpdatedAt } from '../../composables';
import {
    EntityListSlotName,
    createEntityManager, defineEntityManagerEvents,
    initFormAttributesFromSource,
    useValidationTranslator,
    wrapFnWithBusyState,
} from '../../core';
import RegistryList from '../registry/RegistryList';

export default defineComponent({
    props: {
        entity: {
            type: Object as PropType<Node>,
            default: undefined,
        },
        realmId: {
            type: String,
            default: undefined,
        },
        realmName: {
            type: String,
            default: undefined,
        },
    },
    emits: defineEntityManagerEvents<Node>(),
    setup(props, setup) {
        const busy = ref(false);
        const form = reactive({
            name: '',
            public_key: '',
            external_name: '',
            email: '',
            realm_id: '',
            registry_id: '',
            hidden: false,
            ecosystem: '',
        });

        const $v = useVuelidate({
            name: {
                required,
                minLength: minLength(3),
                maxLength: maxLength(30),
            },
            realm_id: {
                required,
            },
            ecosystem: {
                required,
            },
            registry_id: {

            },
            external_name: {
                alphaNumHyphenUnderscore: helpers.regex(alphaNumHyphenUnderscoreRegex),
                minLength: minLength(3),
                maxLength: maxLength(64),
            },
            email: {
                minLength: minLength(10),
                maxLength: maxLength(256),
                email,
            },
            public_key: {
                minLength: minLength(10),
                maxLength: maxLength(4096),
            },
        }, form);

        const manager = createEntityManager({
            type: `${DomainType.NODE}`,
            setup,
            props,
        });

        const isRealmLocked = computed(() => props.realmId ||
                (manager.data.value && manager.data.value.realm_id));

        const updatedAt = useUpdatedAt(props.entity);

        const readContent = (input: string) => (
            isHex(input) ?
                hexToUTF8(input) :
                input
        );

        const initForm = () => {
            initFormAttributesFromSource(form, manager.data.value);

            if (form.public_key) {
                form.public_key = readContent(form.public_key);
            }

            if (!form.realm_id && props.realmId) {
                form.realm_id = props.realmId;
            }

            if (
                !form.name &&
                (props.realmId || props.realmName)
            ) {
                form.name = (props.realmName || props.realmId) as string;
            }
        };

        initForm();

        watch(updatedAt, (val, oldVal) => {
            if (val && val !== oldVal) {
                initForm();
            }
        });

        const submit = wrapFnWithBusyState(busy, async () => {
            if ($v.value.$invalid) return;

            await manager.createOrUpdate(form as Partial<Node>);
        });

        const toggleFormData = <T extends keyof typeof form>(key: T, id: any) => {
            if (form[key] === id) {
                form[key] = null as any;
            } else {
                form[key] = id;
            }
        };

        return () => {
            let realm : VNodeArrayChildren = [];
            if (!isRealmLocked.value) {
                realm = [
                    h(
                        ARealms,
                        {},
                        {
                            [EntityListSlotName.BODY]: (props: ListBodySlotProps<Node>) => buildFormGroup({
                                validationTranslator: useValidationTranslator(),
                                validationResult: $v.value.realm_id,
                                label: true,
                                labelContent: 'Realms',
                                content: buildFormSelect({
                                    value: form.realm_id,
                                    onChange(input) {
                                        form.realm_id = input;
                                    },
                                    options: props.data.map((item) => ({
                                        id: item.id,
                                        value: item.name,
                                    })),
                                }),
                            }),
                        },
                    ),
                    h('hr'),
                ];
            }

            const name = buildFormGroup({
                validationTranslator: useValidationTranslator(),
                validationResult: $v.value.name,
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
                validationTranslator: useValidationTranslator(),
                validationResult: $v.value.external_name,
                label: true,
                labelContent: 'External Name',
                content: buildFormInput({
                    value: form.external_name,
                    onChange(input) {
                        form.external_name = input;
                    },
                }),
            });

            const emailNode = buildFormGroup({
                validationTranslator: useValidationTranslator(),
                validationResult: $v.value.email,
                label: true,
                labelContent: 'E-Mail',
                content: buildFormInput({
                    value: form.email,
                    onChange(input) {
                        form.email = input;
                    },
                }),
            });

            const publicKey = buildFormGroup({
                validationTranslator: useValidationTranslator(),
                validationResult: $v.value.public_key,
                label: true,
                labelContent: 'PublicKey',
                content: buildFormTextarea({
                    value: form.public_key,
                    onChange(input) {
                        form.public_key = input;
                    },
                    props: {
                        rows: 6,
                    },
                }),
            });

            const hidden = h('div', {
                class: 'form-group mb-1',
            }, [
                h('label', { class: 'mb-2' }, ['Hidden']),
                h('div', { class: 'form-check form-switch' }, [
                    h('input', {
                        type: 'checkbox',
                        class: 'form-check-input',
                        checked: form.hidden,
                        onInput: ($event: any) => {
                            if ($event.target.composing) {
                                return;
                            }

                            form.hidden = !form.hidden;
                        },

                        id: 'station-switch',
                    }),
                    h('label', {
                        class: 'form-check-label',
                        for: 'station-switch',
                    }, [
                        'Hide for proposal & train selection?',
                    ]),
                ]),
            ]);

            const registry : VNodeArrayChildren = [
                h('hr'),
                h(RegistryList, {}, {
                    [EntityListSlotName.ITEM_ACTIONS]: (props: ListItemSlotProps<Registry>) => h('button', {
                        disabled: props.busy,
                        class: ['btn btn-xs', {
                            'btn-dark': form.registry_id !== props.data.id,
                            'btn-warning': form.registry_id === props.data.id,
                        }],
                        onClick($event: any) {
                            $event.preventDefault();

                            toggleFormData('registry_id', props.data.id);
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

            const submitNode = buildFormSubmit({
                submit,
                busy: busy.value,
                createText: 'Create',
                updateText: 'Update',
                validationResult: $v.value,
                isEditing: !!manager.data.value,
            });

            return h('div', [
                h('div', { class: 'row' }, [
                    h('div', {
                        class: 'col',
                    }, [
                        realm,
                        name,
                        h('hr'),
                        externalName,
                        h('hr'),
                        registry,

                    ]),
                    h('div', {
                        class: 'col',
                    }, [
                        hidden,
                        h('hr'),
                        emailNode,
                        h('hr'),
                        publicKey,
                        h('hr'),
                        submitNode,
                    ]),
                ]),
            ]);
        };
    },
});
