/*
 * Copyright (c) 2022-2024.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */
import { getSeverity, useTranslationsForNestedValidations } from '@ilingo/vuelidate';
import type {
    RegistryProject,
} from '@privateaim/core';
import {
    DomainType,
    RegistryAPICommand,
    ServiceID,
    registryRobotSecretRegex,
} from '@privateaim/core';
import { buildFormGroup, buildFormInput } from '@vuecs/form-controls';
import useVuelidate from '@vuelidate/core';
import {
    helpers,
} from '@vuelidate/validators';
import type { SlotsType, VNodeChild } from 'vue';
import {
    defineComponent, h, reactive, ref,
} from 'vue';
import type { EntityManagerSlotsType } from '../../core';
import {
    createEntityManager,
    defineEntityManagerEvents,
    defineEntityManagerProps,
    injectCoreHTTPClient,
    wrapFnWithBusyState,
} from '../../core';

export default defineComponent({
    props: defineEntityManagerProps<RegistryProject>(),
    emits: defineEntityManagerEvents<RegistryProject>(),
    slots: Object as SlotsType<EntityManagerSlotsType<RegistryProject>>,
    async setup(props, setup) {
        const apiClient = injectCoreHTTPClient();
        const busy = ref(false);

        const form = reactive({
            secret: '',
        });

        const vuelidate = useVuelidate({
            secret: {
                registryRobotSecret: helpers.regex(registryRobotSecretRegex),
            },
        }, form);

        const manager = createEntityManager({
            type: `${DomainType.REGISTRY_PROJECT}`,
            setup,
            props,
            onResolved(entity) {
                if (entity) {
                    form.secret = entity.account_secret || '';
                }
            },
            onUpdated(entity) {
                if (entity) {
                    form.secret = entity.account_secret || '';
                }
            },
        });

        await manager.resolve({
            query: {
                fields: [
                    '+account_id',
                    '+account_name',
                    '+account_secret',
                ],
            },
        });

        const execute = async (command: RegistryAPICommand) => wrapFnWithBusyState(busy, async () => {
            if (!manager.data.value) return;

            try {
                await apiClient.service.runCommand(ServiceID.REGISTRY, command, {
                    id: manager.data.value.id,
                    secret: form.secret,
                });

                setup.emit('updated', manager.data.value);
            } catch (e) {
                if (e instanceof Error) {
                    setup.emit('failed', e);
                }
            }
        })();

        if (!manager.data.value) {
            return () => h(
                'div',
                { class: 'alert alert-sm alert-warning' },
                [
                    'The registry-project details can not be displayed.',
                ],
            );
        }

        const translationsValidation = useTranslationsForNestedValidations(vuelidate.value);

        return () => {
            const fallback = () : VNodeChild => h('div', [
                h('div', {
                    class: 'mb-2 d-flex flex-column',
                }, [
                    h('div', { class: 'form-group' }, [
                        h('label', { class: 'pe-1' }, 'Namespace'),
                        h('input', {
                            class: 'form-control',
                            type: 'text',
                            value: manager.data.value?.external_name || '',
                            disabled: true,
                        }),
                    ]),

                    h('div', [
                        h('div', { class: 'form-group' }, [
                            h('label', { class: 'pe-1' }, 'ID'),
                            h('input', {
                                class: 'form-control',
                                type: 'text',
                                value: manager.data.value?.account_name || '',
                                placeholder: '...',
                                disabled: true,
                            }),
                        ]),
                        buildFormGroup({
                            label: true,
                            labelContent: 'Secret',
                            validationMessages: translationsValidation.secret.value,
                            validationSeverity: getSeverity(vuelidate.value.secret),
                            content: buildFormInput({
                                props: {
                                    placeholder: '...',
                                },
                                value: form.secret,
                                onChange(value) {
                                    form.secret = value;
                                },
                            }),
                        }),
                    ]),

                    h('div', [
                        h('strong', { class: 'pe-1' }, 'Webhook:'),
                        h('i', {
                            class: {
                                'fa fa-check text-success': manager.data.value?.webhook_exists,
                                'fa fa-times text-danger': !manager.data.value?.webhook_exists,
                            },
                        }),
                    ]),
                ]),
                h('hr'),
                h('div', { class: 'row' }, [
                    h('div', { class: 'col' }, [
                        h('div', {
                            class: 'alert alert-sm alert-info',
                        }, [
                            'Connect the database entity to the registry.',
                        ]),
                        h('div', { class: 'text-center' }, [
                            h('button', {
                                class: 'btn btn-xs btn-primary',
                                disabled: busy.value,
                                type: 'button',
                                onClick($event: any) {
                                    $event.preventDefault();

                                    return execute(RegistryAPICommand.PROJECT_LINK);
                                },
                            }, [
                                h('i', { class: 'fa-solid fa-plug pe-1' }),
                                'Connect',
                            ]),
                        ]),
                    ]),
                    h('div', { class: 'col' }, [
                        h('div', {
                            class: 'alert alert-sm alert-warning',
                        }, [
                            'Disconnect the database entity of the registry.',
                        ]),
                        h('div', { class: 'text-center' }, [
                            h('button', {
                                class: 'btn btn-xs btn-danger',
                                disabled: busy.value,
                                type: 'button',
                                onClick($event: any) {
                                    $event.preventDefault();
                                    return execute(RegistryAPICommand.PROJECT_UNLINK);
                                },
                            }, [
                                h('i', { class: 'fa-solid fa-power-off pe-1' }),
                                'Disconnect',
                            ]),
                        ]),
                    ]),
                ]),
            ]);

            return manager.render(fallback);
        };
    },
});
