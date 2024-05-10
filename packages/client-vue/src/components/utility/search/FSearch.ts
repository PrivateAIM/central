/*
 * Copyright (c) 2023-2024.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type { ListLoadFn } from '@vuecs/list-controls';
import type { PropType, SlotsType } from 'vue';
import { defineComponent, h } from 'vue';
import { ASearch } from '@authup/client-web-kit';
import type { ListMeta } from '../../../core';

export const FSearch = defineComponent({
    props: {
        // todo: add entity-key prop
        icon: {
            type: Boolean,
        },
        iconPosition: {
            type: String as PropType<'start' | 'end'>,
        },
        iconClass: {
            type: String,
        },
        busy: {
            type: Boolean,
        },
        load: {
            type: Function as PropType<ListLoadFn<ListMeta<any>>>,
        },
        meta: {
            type: Object as PropType<ListMeta<any>>,
        },
    },
    slots: Object as SlotsType<{
        default: Record<string, any>
    }>,
    setup(props, { slots }) {
        return () => h(ASearch, {
            slots,
            icon: props.icon,
            iconPosition: props.iconPosition,
            busy: props.busy,
            load: props.load,
            meta: props.meta,
        });
    },
});
