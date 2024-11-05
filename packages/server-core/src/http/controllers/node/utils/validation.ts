/*
 * Copyright (c) 2022-2024.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { NodeType } from '@privateaim/core-kit';
import { Container } from 'validup';
import { createValidator } from '@validup/adapter-validator';
import type { NodeEntity } from '../../../../domains';
import { HTTPHandlerOperation } from '../../constants';

export class NodeValidator extends Container<NodeEntity> {
    protected initialize() {
        super.initialize();

        this.mount(
            'name',
            { group: HTTPHandlerOperation.CREATE },
            createValidator((chain) => chain
                .isLength({ min: 3, max: 128 })
                .exists()
                .notEmpty()),
        );

        this.mount(
            'name',
            { group: HTTPHandlerOperation.UPDATE },
            createValidator((chain) => chain
                .isLength({ min: 3, max: 128 })
                .optional({ values: 'null' })),
        );

        this.mount(
            'type',
            createValidator((chain) => chain
                .isIn(Object.values(NodeType))
                .optional()),
        );

        this.mount(
            'hidden',
            createValidator((chain) => chain
                .isBoolean()
                .optional()),
        );

        this.mount(
            'public_key',
            createValidator((chain) => chain
                .isLength({ min: 5, max: 4096 })
                .exists()
                .optional({ nullable: true })),
        );

        this.mount(
            'external_name',
            createValidator((chain) => chain
                .isLength({ min: 1, max: 64 })
                .exists()
                .matches(/^[a-z0-9-_]*$/)
                .optional({ nullable: true })),
        );

        this.mount(
            'registry_id',
            createValidator((chain) => chain
                .isUUID()
                .optional({ nullable: true })),
        );

        this.mount(
            'robot_id',
            createValidator((chain) => chain
                .isUUID()
                .optional({ nullable: true })),
        );

        this.mount(
            'realm_id',
            { group: HTTPHandlerOperation.CREATE },
            createValidator((chain) => chain
                .exists()
                .isUUID()
                .optional({ nullable: true })),
        );
    }
}
