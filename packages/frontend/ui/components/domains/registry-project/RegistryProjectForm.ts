/*
 * Copyright (c) 2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import {
    Registry, RegistryProject, Station, createNanoID,
} from '@personalhealthtrain/central-common';
import Vue, {
    CreateElement, PropType, VNode, VNodeChildren, VNodeData,
} from 'vue';
import {
    ComponentFormData, SlotName, buildFormInput, buildFormSubmit, initPropertiesFromSource,
} from '@vue-layout/utils';
import {
    helpers,
    maxLength, minLength, required,
} from 'vuelidate/lib/validators';
import { buildVuelidateTranslator } from '../../../config/ilingo/utils';
import { RegistryList } from '../registry/RegistryList';

type Properties = {
    entity: RegistryProject,
    registryId?: Registry['id']
};

const alphaNum = helpers.regex('alphaNum', /^[a-z0-9]*$/);

export const RegistryProjectForm = Vue.extend<ComponentFormData<RegistryProject>, any, any, Properties>({
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
    data() {
        return {
            form: {
                external_name: '',
                name: '',
                ecosystem_aggregator: false,
                registry_id: '',
            },

            busy: false,
        };
    },
    computed: {
        isEditing() {
            return this.entity &&
                Object.prototype.hasOwnProperty.call(this.entity, 'id');
        },
        isRegistryLocked() {
            return this.registryId;
        },
        isAliasUnchanged() {
            if (!this.entity || !this.entity.external_name) {
                return true;
            }

            return this.entity.external_name !== this.form.external_name;
        },
        updatedAt() {
            return this.entity ? this.entity.updated_at : undefined;
        },
    },
    watch: {
        updatedAt(val, oldVal) {
            if (val && val !== oldVal) {
                this.initFromProperties();
            }
        },
    },
    created() {
        this.initFromProperties();
    },
    validations() {
        return {
            form: {
                name: {
                    required,
                    minLength: minLength(3),
                    maxLength: maxLength(128),
                },
                external_name: {
                    required,
                    alphaNum,
                    minLength: minLength(3),
                    maxLength: maxLength(64),
                },
                ecosystem_aggregator: {
                    required,
                },
                realm_id: {
                    required,
                },
            },
        };
    },
    methods: {
        initFromProperties() {
            if (this.projectId) {
                this.form.project_id = this.projectId;
            }

            if (typeof this.entity === 'undefined') {
                this.generateAlias();
            }

            initPropertiesFromSource(this.entity, this.form);
        },
        async submit() {
            if (this.busy || this.$v.$invalid) {
                return;
            }

            this.busy = true;

            try {
                let response;

                if (this.isEditing) {
                    response = await this.$api.registryProject.update(this.entity.id, this.form);

                    this.$emit('updated', response);
                } else {
                    response = await this.$api.registryProject.create(this.form);

                    this.$emit('created', response);
                }
            } catch (e) {
                if (e instanceof Error) {
                    this.$emit('failed', e);
                }
            }

            this.busy = false;
        },
        async toggleFormData(key, id) {
            if (this.form[key] === id) {
                this.form[key] = null;
            } else {
                this.form[key] = id;
            }
        },

        generateAlias() {
            this.form.external_name = createNanoID();
        },
        resetAlias() {
            this.form.external_name = this.entity.external_name;
        },
    },
    render(createElement: CreateElement): VNode {
        const vm = this;
        const h = createElement;

        const name = buildFormInput<RegistryProject>(vm, h, {
            validationTranslator: buildVuelidateTranslator(this.$ilingo),
            title: 'Name',
            propName: 'name',
        });
        const externalName = buildFormInput<Station>(vm, h, {
            validationTranslator: buildVuelidateTranslator(vm.$ilingo),
            title: 'Alias',
            propName: 'external_name',
        });

        const externalNameHint = h('div', {
            staticClass: 'alert alert-sm',
            class: {
                'alert-danger': !vm.isAliasUnchanged,
                'alert-info': vm.isAliasUnchanged,
            },
        }, [
            h('div', { staticClass: 'mb-1' }, [
                (!vm.isAliasUnchanged ?
                    'If you change the external_name, a new representation will be created in the Registry.' :
                    'If you don\'t want to chose a external_name by your own, you can generate one.'
                ),
            ]),
            h('button', {
                class: 'btn btn-xs btn-dark',
                attrs: {
                    type: 'button',
                },
                on: {
                    click($event) {
                        $event.preventDefault();

                        vm.generateAlias.call(null);
                    },
                },
            }, [
                h('i', { staticClass: 'fa fa-wrench pr-1' }),
                'Generate',
            ]),
            h('button', {
                class: 'btn btn-xs btn-dark ml-1',
                attrs: {
                    type: 'button',
                    disabled: vm.isAliasUnchanged,
                },
                on: {
                    click($event) {
                        $event.preventDefault();

                        vm.resetAlias.call(null);
                    },
                },
            }, [
                h('i', { staticClass: 'fa fa-undo pr-1' }),
                'Reset',
            ]),
        ]);

        const ecosystemAggregator = h('div', {
            staticClass: 'form-group mb-1',
        }, [
            h('b-form-checkbox', {
                model: {
                    value: vm.form.ecosystem_aggregator,
                    callback(v: boolean) {
                        vm.form.ecosystem_aggregator = v;
                    },
                    expression: 'form.ecosystem_aggregator',
                },
            } as VNodeData, [
                'Aggregator for ecosystem?',
            ]),
            h('div', {
                staticClass: 'alert alert-sm alert-info mt-1',
            }, [
                'If enabled this project will act as a aggregator project to transfer trains in this ecosystem.',
            ]),
        ]);

        let registry : VNodeChildren = [];

        if (!vm.isRegistryLocked) {
            registry = [
                h('hr'),
                h(RegistryList, {
                    scopedSlots: {
                        [SlotName.ITEM_ACTIONS]: (props) => h('button', {
                            attrs: {
                                disabled: props.busy,
                            },
                            class: {
                                'btn-dark': vm.form.registry_id !== props.item.id,
                                'btn-warning': vm.form.registry_id === props.item.id,
                            },
                            staticClass: 'btn btn-xs',
                            on: {
                                click($event) {
                                    $event.preventDefault();

                                    vm.toggleFormData.call(null, 'registry_id', props.item.id);
                                },
                            },
                        }, [
                            h('i', {
                                class: {
                                    'fa fa-plus': vm.form.registry_id !== props.item.id,
                                    'fa fa-minus': vm.form.registry_id === props.item.id,
                                },
                            }),
                        ]),
                    },
                }),
            ];
        }

        const submit = buildFormSubmit(vm, h, {
            createText: 'Create',
            updateText: 'Update',
        });

        return h('form', {
            on: {
                submit($event) {
                    $event.preventDefault();
                },
            },
        }, [
            name,
            h('hr'),
            externalName,
            externalNameHint,
            h('hr'),
            ecosystemAggregator,
            registry,
            h('hr'),
            submit,
        ]);
    },
});

export default RegistryProjectForm;
