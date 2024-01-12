/*
 * Copyright (c) 2022-2023.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type { MasterImage, AnalysisFile } from '@personalhealthtrain/core';
import {
    computed, defineComponent, h, ref, toRefs, watch,
} from 'vue';
import { injectAPIClient, wrapFnWithBusyState } from '../../core';

export default defineComponent({
    props: {
        trainId: {
            type: String,
            default: undefined,
        },
        masterImageId: {
            type: String,
            default: undefined,
        },
        trainFileId: {
            type: String,
            default: undefined,
        },
    },
    emits: ['failed'],
    async setup(props, { emit }) {
        const apiClient = injectAPIClient();
        const refs = toRefs(props);

        const masterImageEntity = ref<null | MasterImage>(null);
        const masterImageBusy = ref(false);

        const trainFileEntity = ref<null | AnalysisFile>(null);
        const trainFileBusy = ref(false);

        const command = computed(() => {
            let command = '<Command>';

            if (
                masterImageEntity.value &&
                masterImageEntity.value.command &&
                !masterImageEntity.value.command.match(/\//g)
            ) {
                command = `/usr/bin/${masterImageEntity.value.command}`;
            }

            return command;
        });

        const file = computed(() => {
            if (!trainFileEntity.value) {
                return '<File>';
            }

            let fileDirectoryPath = trainFileEntity.value.directory || '.';
            if (fileDirectoryPath === '.') fileDirectoryPath = './';

            return `${fileDirectoryPath}${trainFileEntity.value.name}`;
        });

        const loadMasterImage = wrapFnWithBusyState(masterImageBusy, async () => {
            if (!refs.masterImageId.value) return;

            try {
                const item = await apiClient.masterImage.getOne(refs.masterImageId.value);
                const { data } = await apiClient.masterImageGroup.getMany({
                    filters: {
                        virtual_path: item.group_virtual_path,
                    },
                });

                if (data.length === 1) {
                    item.command = item.command || data[0].command;
                    item.command_arguments = item.command_arguments || data[0].command_arguments;
                }

                masterImageEntity.value = item;
            } catch (e) {
                if (e instanceof Error) {
                    emit('failed', e);
                }
            }
        });

        await loadMasterImage();

        watch(refs.masterImageId, async (value, oldValue) => {
            if (value && value !== oldValue) {
                await loadMasterImage();
            }
        });

        const loadTrainFile = wrapFnWithBusyState(trainFileBusy, async () => {
            if (!refs.trainFileId.value) return;

            try {
                trainFileEntity.value = await apiClient.trainFile.getOne(refs.trainFileId.value);
            } catch (e) {
                if (e instanceof Error) {
                    emit('failed', e);
                }
            }
        });

        await loadTrainFile();

        watch(refs.trainFileId, async (value, oldValue) => {
            if (value) {
                if (value !== oldValue) {
                    await loadTrainFile();
                }
            } else {
                trainFileEntity.value = null;
            }
        });

        await Promise.all([loadMasterImage, loadTrainFile]);

        return () => h('div', {
            class: 'command-box',
        }, [
            h('strong', { class: 'pe-1 shell-sign' }, [
                '$',
            ]),
            command.value,
            ' ',
            file.value,
        ]);
    },
});
