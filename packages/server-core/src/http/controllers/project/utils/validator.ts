/*
 * Copyright (c) 2022-2024.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { Container } from 'validup';
import { createValidator } from '@validup/adapter-validator';
import { HTTPHandlerOperation } from '@privateaim/server-http-kit';
import type { ProjectEntity } from '../../../../domains';

export class ProjectValidator extends Container<ProjectEntity> {
    protected initialize() {
        super.initialize();

        this.mount(
            'name',
            { group: HTTPHandlerOperation.CREATE },
            createValidator((chain) => chain
                .exists()
                .isLength({ min: 5, max: 100 })),
        );

        this.mount(
            'name',
            { group: HTTPHandlerOperation.UPDATE, optional: true },
            createValidator((chain) => chain
                .exists()
                .isLength({ min: 5, max: 100 })),
        );

        this.mount(
            'description',
            { optional: true },
            createValidator((chain) => chain
                .isString()
                .isLength({ min: 5, max: 4096 })
                .optional({ values: 'null' })),
        );

        this.mount(
            'master_image_id',
            { optional: true },
            createValidator((chain) => chain
                .isUUID()
                .optional({ nullable: true })),
        );
    }
}
