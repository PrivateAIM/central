/*
 * Copyright (c) 2023.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */
import { adjustFilePath } from 'typeorm-extension';
import type { DataSourceOptions } from 'typeorm';
import { hasRedisClient } from '../../core';
import {
    AnalysisEntity,
    AnalysisFileEntity,
    AnalysisLogEntity,
    AnalysisNodeEntity,
    MasterImageEntity,
    MasterImageGroupEntity,
    NodeEntity,
    ProjectEntity,
    ProjectNodeEntity,
    RegistryEntity,
    RegistryProjectEntity,
} from '../../domains';
import { DatabaseQueryResultCache } from '../cache';
import { MasterImageSubscriber } from '../subscribers/master-image';
import { MasterImageGroupSubscriber } from '../subscribers/master-image-group';
import { ProposalSubscriber } from '../subscribers/proposal';
import { ProposalStationSubscriber } from '../subscribers/proposal-station';
import { RegistrySubscriber } from '../subscribers/registry';
import { RegistryProjectSubscriber } from '../subscribers/registry-project';
import { StationSubscriber } from '../subscribers/station';
import { TrainSubscriber } from '../subscribers/train';
import { TrainFileSubscriber } from '../subscribers/train-file';
import { TrainLogSubscriber } from '../subscribers/train-log';
import { TrainStationSubscriber } from '../subscribers/train-station';

export async function extendDataSourceOptions(options: DataSourceOptions) : Promise<DataSourceOptions> {
    options = {
        ...options,
        logging: false,
        entities: [
            ...(options.entities ? options.entities : []) as string[],
            MasterImageEntity,
            MasterImageGroupEntity,
            ProjectEntity,
            ProjectNodeEntity,
            RegistryEntity,
            RegistryProjectEntity,
            NodeEntity,
            AnalysisEntity,
            AnalysisLogEntity,
            AnalysisFileEntity,
            AnalysisNodeEntity,
        ],
        migrations: [],
        migrationsTransactionMode: 'each',
        subscribers: [
            ...(options.subscribers ? options.subscribers : []) as string[],
            MasterImageSubscriber,
            MasterImageGroupSubscriber,
            ProposalSubscriber,
            ProposalStationSubscriber,
            RegistrySubscriber,
            RegistryProjectSubscriber,
            StationSubscriber,
            TrainSubscriber,
            TrainFileSubscriber,
            TrainLogSubscriber,
            TrainStationSubscriber,
        ],
    };

    const migrations : string[] = [];
    const migration = await adjustFilePath(
        `src/database/migrations/${options.type}/*.{ts,js}`,
    );

    migrations.push(migration);

    Object.assign(options, {
        migrations,
    } as DataSourceOptions);

    if (hasRedisClient()) {
        Object.assign(options, {
            cache: {
                provider() {
                    return new DatabaseQueryResultCache();
                },
            },
        } as Partial<DataSourceOptions>);
    }

    return options;
}
