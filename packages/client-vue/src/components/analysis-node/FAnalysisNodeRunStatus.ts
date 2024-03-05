/*
 * Copyright (c) 2022-2024.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { AnalysisNodeRunStatus } from '@privateaim/core';
import { computed, defineComponent, h } from 'vue';
import { hasNormalizedSlot, normalizeSlot } from '../../core';

export default defineComponent({
    props: {
        status: {
            type: String,
            default: null,
        },
    },
    setup(props, { slots }) {
        const statusText = computed(() => {
            switch (props.status) {
                case AnalysisNodeRunStatus.ARRIVED:
                    return 'arrived';
                case AnalysisNodeRunStatus.DEPARTED:
                    return 'departed';
                default:
                    return 'none';
            }
        });

        const classSuffix = computed(() => {
            switch (props.status) {
                case AnalysisNodeRunStatus.ARRIVED:
                    return 'primary';
                case AnalysisNodeRunStatus.DEPARTED:
                    return 'success';
                default:
                    return 'info';
            }
        });

        if (hasNormalizedSlot('default', slots)) {
            return () => normalizeSlot(
                'default',
                {
                    classSuffix: classSuffix.value,
                    statusText: statusText.value,
                },
                slots,
            );
        }

        return () => h('span', {
            class: `text-${classSuffix.value}`,
        }, [statusText.value]);
    },
});
