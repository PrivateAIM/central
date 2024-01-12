/*
 * Copyright (c) 2021-2021.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

export enum AnalysisBuildStatus {
    STARTING = 'starting', // ui trigger
    STARTED = 'started', // tb trigger

    STOPPING = 'stopping', // ui trigger
    STOPPED = 'stopped', // tb trigger

    FINISHED = 'finished', // tb trigger
    FAILED = 'failed', // tb trigger
}

// -------------------------------------------------------------------------

export enum AnalysisConfigurationStatus {
    BASE_CONFIGURED = 'base',
    SECURITY_CONFIGURED = 'security_configured',
    RESOURCE_CONFIGURED = 'resource_configured',
    HASH_GENERATED = 'hash_generated',
    HASH_SIGNED = 'hash_signed',
    FINISHED = 'finished',
}

// -------------------------------------------------------------------------

export enum AnalysisRunStatus {
    STARTING = 'starting',
    STARTED = 'started',

    RUNNING = 'running',

    STOPPING = 'stopping',
    STOPPED = 'stopped',

    FINISHED = 'finished',
    FAILED = 'failed',
}

// -------------------------------------------------------------------------

export enum AnalysisResultStatus {
    STARTED = 'started',

    DOWNLOADING = 'downloading',
    DOWNLOADED = 'downloaded',

    PROCESSING = 'extracting',
    PROCESSED = 'extracted',

    FINISHED = 'finished',
    FAILED = 'failed',
}

// -------------------------------------------------------------------------

export enum AnalysisAPICommand {
    BUILD_START = 'buildStart',
    BUILD_STOP = 'buildStop',
    BUILD_STATUS = 'buildStatus',

    RUN_START = 'runStart',
    RUN_RESET = 'runReset',
    RUN_STATUS = 'runStatus',

    RESULT_STATUS = 'resultStatus',
    RESULT_START = 'resultStart',

    GENERATE_HASH = 'generateHash',
}

// -------------------------------------------------------------------------

export enum AnalysisContainerPath {
    MAIN = '/opt/'
}