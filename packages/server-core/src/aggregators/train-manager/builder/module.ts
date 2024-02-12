/*
 * Copyright (c) 2022-2023.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { ComponentError, isComponentContextWithError } from '@privateaim/server-kit';
import type { ComponentContextWithError } from '@privateaim/server-kit';
import {
    BuilderCommand,
    BuilderEvent,
    ComponentName,
} from '@privateaim/server-analysis-manager';
import type {
    BuilderEventContext,
} from '@privateaim/server-analysis-manager';
import {

    AnalysisBuildStatus,
} from '@privateaim/core';
import { useDataSource } from 'typeorm-extension';
import type { AnalysisLogSaveContext } from '../../../domains';
import { AnalysisEntity, saveAnalysisLog } from '../../../domains';

export async function handleTrainManagerBuilderEvent(
    context: BuilderEventContext | ComponentContextWithError<BuilderEventContext>,
) {
    const dataSource = await useDataSource();
    const repository = dataSource.getRepository(AnalysisEntity);

    const entity = await repository.findOneBy({ id: context.data.id });
    if (!entity) {
        return;
    }

    let trainLogContext : AnalysisLogSaveContext = {
        train: entity,
        component: ComponentName.BUILDER,
        command: context.command,
        event: context.event,
    };

    switch (context.event) {
        case BuilderEvent.NONE:
            if (
                entity.run_status === null &&
                entity.result_status === null
            ) {
                entity.build_status = null;
            }
            break;
        case BuilderEvent.BUILDING:
            entity.build_status = AnalysisBuildStatus.STARTED;

            trainLogContext.status = AnalysisBuildStatus.STARTED;
            break;
        case BuilderEvent.FAILED: {
            if (context.command === BuilderCommand.BUILD) {
                entity.build_status = AnalysisBuildStatus.FAILED;
            }

            if (
                isComponentContextWithError(context) &&
                context.error instanceof ComponentError
            ) {
                trainLogContext = {
                    ...trainLogContext,
                    status: AnalysisBuildStatus.FAILED,
                    statusMessage: context.error.message,

                    error: true,
                    errorCode: `${context.error.code}`,
                    step: `${context.error.step}`,
                };
            }

            break;
        }
        case BuilderEvent.PUSHED:
            entity.build_status = AnalysisBuildStatus.FINISHED;

            trainLogContext.status = AnalysisBuildStatus.FINISHED;
            break;
    }

    if (
        context.event !== BuilderEvent.FAILED &&
        context.event !== BuilderEvent.NONE
    ) {
        entity.run_status = null;
        entity.result_status = null;
    }

    await repository.save(entity);

    await saveAnalysisLog(trainLogContext);
}
