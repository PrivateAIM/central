/*
 * Copyright (c) 2022-2024.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { AnalysisNodeApprovalStatus, AnalysisNodeRunStatus } from '@privateaim/core-kit';
import { Container } from 'validup';
import { createValidator } from '@validup/adapter-validator';
import type { AnalysisNodeEntity } from '../../../../domains';
import { HTTPHandlerOperation } from '../../constants';

export class AnalysisNodeValidator extends Container<AnalysisNodeEntity> {
    protected initialize() {
        super.initialize();

        this.mount(
            'node_id',
            { group: HTTPHandlerOperation.CREATE },
            createValidator((chain) => chain
                .exists()
                .notEmpty()
                .isUUID()),
        );

        this.mount(
            'analysis_id',
            { group: HTTPHandlerOperation.CREATE },
            createValidator((chain) => chain
                .exists()
                .notEmpty()
                .isUUID()),
        );

        this.mount(
            'run_status',
            createValidator((chain) => chain
                .isIn(Object.values(AnalysisNodeRunStatus))
                .optional({ values: 'null' })),
        );

        this.mount(
            'index',
            createValidator((chain) => chain
                .exists()
                .isInt()
                .optional()),
        );

        this.mount(
            'approval_status',
            createValidator((chain) => chain
                .optional({ nullable: true })
                .isIn(Object.values(AnalysisNodeApprovalStatus))),
        );

        this.mount(
            'comment',
            createValidator((chain) => chain
                .optional({ nullable: true })
                .isString()),
        );
    }
}
