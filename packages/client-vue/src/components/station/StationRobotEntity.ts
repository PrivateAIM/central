/*
 * Copyright (c) 2022-2024.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type { EntityManagerSlotProps } from '@authup/client-vue';
import { ARobot } from '@authup/client-vue';
import type { PropType } from 'vue';
import { defineComponent, h, reactive } from 'vue';
import type { Node } from '@privateaim/core';
import type { Robot } from '@authup/core';
import { buildFormGroup, buildFormInput, buildFormSubmit } from '@vuecs/form-controls';
import useVuelidate from '@vuelidate/core';
import { maxLength, minLength } from '@vuelidate/validators';
import { initFormAttributesFromSource, useValidationTranslator } from '../../core';

export default defineComponent({
    props: {
        entity: {
            type: Object as PropType<Node>,
            required: true,
        },
    },
    emits: ['failed'],
    setup(props, { emit }) {
        const form = reactive({
            id: '',
            secret: '',
        });

        const $v = useVuelidate({
            id: {

            },
            secret: {
                minLength: minLength(3),
                maxLength: maxLength(256),
            },
        }, form);

        return () => h(ARobot, {
            onResolved(entity) {
                if (entity) {
                    initFormAttributesFromSource(form, entity);
                }
            },
            onFailed: (e) => {
                emit('failed', e);
            },
            queryFilters: {
                name: props.entity.id,
                realm_id: props.entity.realm_id,
            },
        }, {
            default: (slotProps: EntityManagerSlotProps<Robot>) => {
                if (!slotProps.data) {
                    return h(
                        'div',
                        { class: 'alert alert-sm alert-warning' },
                        [
                            'The robot details can not be displayed.',
                        ],
                    );
                }

                const id = buildFormGroup({
                    validationTranslator: useValidationTranslator(),
                    validationResult: $v.value.id,
                    label: true,
                    labelContent: 'ID',
                    content: buildFormInput({
                        value: form.id,
                        props: {
                            disabled: true,
                        },
                    }),
                });

                const secret = buildFormGroup({
                    validationTranslator: useValidationTranslator(),
                    validationResult: $v.value.secret,
                    label: true,
                    labelContent: 'Secret',
                    content: buildFormInput({
                        value: form.secret,
                        props: {
                            placeholder: '...',
                        },
                        onChange(value) {
                            form.secret = value;
                        },
                    }),
                });

                const submitForm = buildFormSubmit({
                    submit: () => slotProps.update(form),
                    busy: slotProps.busy,
                    updateText: 'Update',
                    createText: 'Create',
                    isEditing: !!slotProps.data,
                });

                return h('div', [
                    id,
                    secret,
                    submitForm,
                ]);
            },
        });
    },
});
