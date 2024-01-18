/*
 * Copyright (c) 2021-2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import crypto from 'node:crypto';
import { AnalysisConfigurationStatus } from '@personalhealthtrain/core';
import { useDataSource } from 'typeorm-extension';
import { useMinio } from '../../../core/minio';
import { streamToBuffer } from '../../../core/utils';
import { generateAnalysisMinioBucketName } from '../utils';
import { resolveTrain } from './utils';
import { AnalysisEntity } from '../entity';
import { AnalysisFileEntity } from '../../analysis-file/entity';

export async function generateTrainHash(train: AnalysisEntity | string) : Promise<AnalysisEntity> {
    const dataSource = await useDataSource();
    const repository = dataSource.getRepository(AnalysisEntity);

    train = await resolveTrain(train, repository);

    const hash = crypto.createHash('sha512');
    // User Hash
    hash.update(Buffer.from(train.user_id.toString(), 'utf-8'));

    // Files
    const trainFilesRepository = dataSource.getRepository(AnalysisFileEntity);
    const trainFiles = await trainFilesRepository.createQueryBuilder('trainFiles')
        .where('trainFiles.train_id = :id', { id: train.id })
        .getMany();

    const minio = useMinio();
    const bucketName = generateAnalysisMinioBucketName(train.id);

    const promises : Promise<Buffer>[] = [];

    for (let i = 0; i < trainFiles.length; i++) {
        const promise = new Promise<Buffer>((resolve, reject) => {
            minio.getObject(bucketName, trainFiles[i].hash)
                .then((stream) => streamToBuffer(stream))
                .then((buffer) => resolve(buffer))
                .catch((e) => reject(e));
        });

        promises.push(promise);
    }

    const fileContents = await Promise.all(promises);
    for (let i = 0; i < fileContents.length; i++) {
        hash.update(fileContents[i]);
    }

    // Session id hash
    const sessionId: Buffer = crypto.randomBytes(64);
    hash.update(sessionId);

    train.session_id = sessionId.toString('hex');

    if (
        train.query &&
        train.query.length > 0
    ) {
        let { query } = train;
        if (typeof query !== 'string') {
            query = JSON.stringify(query);
        }

        hash.update(Buffer.from(query, 'utf-8'));
    }

    train.hash = hash.digest('hex');
    train.configuration_status = AnalysisConfigurationStatus.HASH_GENERATED;

    train = await repository.save(train);

    return train;
}
