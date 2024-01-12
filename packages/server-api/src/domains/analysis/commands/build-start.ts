/*
 * Copyright (c) 2021-2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { BadRequestError } from '@ebec/http';
import {
    Ecosystem,
    RegistryProjectType,
    AnalysisBuildStatus,
    AnalysisNodeApprovalStatus,
} from '@personalhealthtrain/core';
import { BuilderCommand, buildBuilderQueuePayload } from '@personalhealthtrain/server-train-manager';
import { publish } from 'amqp-extension';
import { useDataSource } from 'typeorm-extension';
import { RegistryProjectEntity } from '../../registry-project/entity';
import { RegistryEntity } from '../../registry/entity';
import { AnalysisNodeEntity } from '../../anaylsis-node/entity';
import { AnalysisEntity } from '../entity';
import { resolveTrain } from './utils';

export async function startBuildTrain(
    train: AnalysisEntity | string,
) : Promise<AnalysisEntity> {
    const dataSource = await useDataSource();
    const repository = dataSource.getRepository(AnalysisEntity);

    train = await resolveTrain(train, repository);

    if (train.run_status) {
        throw new BadRequestError('The train can not longer be build...');
    } else {
        const trainStationRepository = dataSource.getRepository(AnalysisNodeEntity);
        const trainStations = await trainStationRepository.findBy({
            analysis_id: train.id,
        });

        for (let i = 0; i < trainStations.length; i++) {
            if (trainStations[i].approval_status !== AnalysisNodeApprovalStatus.APPROVED) {
                throw new BadRequestError('Not all stations have approved the train yet.');
            }
        }

        if (!train.registry_id) {
            const registryRepository = dataSource.getRepository(RegistryEntity);
            const registry = await registryRepository.findOne({
                where: {
                    ecosystem: Ecosystem.DEFAULT,
                },
            });

            if (!registry) {
                throw new BadRequestError('No registry is registered for the default ecosystem.');
            }

            train.registry_id = registry.id;
        }

        if (!train.incoming_registry_project_id) {
            const projectRepository = dataSource.getRepository(RegistryProjectEntity);
            const project = await projectRepository.findOne({
                where: {
                    registry_id: train.registry_id,
                    type: RegistryProjectType.INCOMING,
                },
            });

            if (!project) {
                throw new BadRequestError('No incoming project is registered for the default ecosystem.');
            }

            train.incoming_registry_project_id = project.id;
        }

        await publish(buildBuilderQueuePayload({
            command: BuilderCommand.BUILD,
            data: {
                id: train.id,
            },
        }));

        train.build_status = AnalysisBuildStatus.STARTING;

        await repository.save(train);
    }

    return train;
}
