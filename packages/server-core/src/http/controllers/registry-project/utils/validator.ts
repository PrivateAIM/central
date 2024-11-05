/*
 * Copyright (c) 2022-2024.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { RegistryProjectType } from '@privateaim/core-kit';
import { Container } from 'validup';
import { createValidator } from '@validup/adapter-validator';
import type { RegistryProjectEntity } from '../../../../domains';
import { HTTPHandlerOperation } from '../../constants';

export class RegistryProjectValidator extends Container<RegistryProjectEntity> {
    protected initialize() {
        super.initialize();

        this.mount(
            'registry_id',
            { group: HTTPHandlerOperation.CREATE },
            createValidator((chain) => chain
                .exists()
                .notEmpty()
                .isUUID()),
        );

        this.mount(
            'name',
            { group: HTTPHandlerOperation.CREATE },
            createValidator((chain) => chain
                .exists()
                .isLength({ min: 5, max: 128 })),
        );

        this.mount(
            'name',
            { group: HTTPHandlerOperation.UPDATE },
            createValidator((chain) => chain
                .exists()
                .isLength({ min: 5, max: 128 })
                .optional()),
        );

        this.mount(
            'external_name',
            { group: HTTPHandlerOperation.CREATE },
            createValidator((chain) => chain
                .isLength({ min: 1, max: 255 })
                .exists()
                .matches(/^[a-z0-9-_]*$/)),
        );

        this.mount(
            'external_name',
            { group: HTTPHandlerOperation.UPDATE },
            createValidator((chain) => chain
                .isLength({ min: 1, max: 255 })
                .exists()
                .matches(/^[a-z0-9-_]*$/)
                .optional()),
        );

        this.mount(
            'type',
            { group: HTTPHandlerOperation.CREATE },
            createValidator((chain) => chain
                .exists()
                .isIn(Object.values(RegistryProjectType))),
        );
    }
}
