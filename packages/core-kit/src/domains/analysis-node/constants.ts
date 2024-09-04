/*
 * Copyright (c) 2021-2024.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

export enum AnalysisNodeApprovalCommand {
    APPROVE = 'approve',
    REJECT = 'reject',
}

export enum AnalysisNodeApprovalStatus {
    REJECTED = 'rejected',
    APPROVED = 'approved',
}

// -------------------------------------------------------------------------

export enum AnalysisNodeRunStatus {
    STARTING = 'starting',
    STARTED = 'started',

    STOPPING = 'stopping',
    STOPPED = 'stopped',

    FINISHING = 'finishing',
    FINISHED = 'finished',

    FAILED = 'failed',
}
