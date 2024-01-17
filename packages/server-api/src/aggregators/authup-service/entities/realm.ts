/*
 * Copyright (c) 2023.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */
import type { RealmEventContext } from '@authup/core';
import { useDataSource } from 'typeorm-extension';
import {
    ProjectEntity, ProjectNodeEntity, RegistryProjectEntity, NodeEntity, AnalysisEntity, UserSecretEntity,
} from '../../../domains';

export async function handleAuthupRealmEvent(context: RealmEventContext) {
    if (context.event === 'deleted') {
        const dataSource = await useDataSource();

        const proposalRepository = dataSource.getRepository(ProjectEntity);
        const proposals = await proposalRepository.find({
            where: {
                realm_id: context.data.id,
            },
        });

        await proposalRepository.remove(proposals);

        const proposalStationRepository = dataSource.getRepository(ProjectNodeEntity);
        const proposalStations = await proposalStationRepository.createQueryBuilder()
            .where('proposal_realm_id = :realmId', { realmId: context.data.id })
            .orWhere('station_realm_id = :realmId', { realmId: context.data.id })
            .getMany();

        await proposalStationRepository.remove(proposalStations);

        const registryProjectRepository = dataSource.getRepository(RegistryProjectEntity);
        const registryProjects = await registryProjectRepository.find({
            where: {
                realm_id: context.data.id,
            },
        });

        await registryProjectRepository.remove(registryProjects);

        const stationRepository = dataSource.getRepository(NodeEntity);
        const stations = await stationRepository.find({
            where: {
                realm_id: context.data.id,
            },
        });

        await stationRepository.remove(stations);

        const trainRepository = dataSource.getRepository(AnalysisEntity);
        const trains = await trainRepository.find({
            where: {
                realm_id: context.data.id,
            },
        });

        await trainRepository.remove(trains);

        const trainFileRepository = dataSource.getRepository(AnalysisEntity);
        const trainFiles = await trainFileRepository.find({
            where: {
                realm_id: context.data.id,
            },
        });

        await trainRepository.remove(trainFiles);

        const trainLogRepository = dataSource.getRepository(AnalysisEntity);
        const trainLogs = await trainLogRepository.find({
            where: {
                realm_id: context.data.id,
            },
        });

        await trainLogRepository.remove(trainLogs);

        const trainStationRepository = dataSource.getRepository(ProjectNodeEntity);
        const trainStations = await trainStationRepository.createQueryBuilder()
            .where('station_realm_id = :realmId', { realmId: context.data.id })
            .orWhere('proposal_realm_id = :realmId', { realmId: context.data.id })
            .getMany();

        await proposalStationRepository.remove(trainStations);

        const userSecretRepository = dataSource.getRepository(UserSecretEntity);
        const userSecrets = await userSecretRepository.find({
            where: {
                realm_id: context.data.id,
            },
        });

        await userSecretRepository.remove(userSecrets);
    }
}
