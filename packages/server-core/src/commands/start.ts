/*
 * Copyright (c) 2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { DataSource } from 'typeorm';
import {
    checkDatabase, createDatabase, setDataSource, synchronizeDatabaseSchema,
} from 'typeorm-extension';
import {
    createConfig, getWritableDirPath, useEnv, useLogger,
} from '../config';
import { setupAuthupService } from '../core';
import { buildDataSourceOptions } from '../database';
import { createRouter } from '../http/router';
import { createHttpServer } from '../http/server';
import { generateSwaggerDocumentation } from '../http/swagger';

export async function startCommand() {
    const config = createConfig();

    const logger = useLogger();

    logger.info(`Environment: ${useEnv('env')}`);
    logger.info(`WritableDirectoryPath: ${getWritableDirPath()}`);
    logger.info(`Port: ${useEnv('port')}`);
    logger.info(`Public-URL: ${useEnv('publicURL')}`);
    logger.info(`Authup-URL: ${useEnv('authupApiURL')}`);
    logger.info(`Docs-URL: ${new URL('docs/', useEnv('publicURL')).href}`);

    logger.info('Generating documentation...');

    await generateSwaggerDocumentation();

    logger.info('Generated documentation.');

    const options = await buildDataSourceOptions();

    logger.info(`Database: ${options.type}`);

    const check = await checkDatabase({
        options,
        dataSourceCleanup: true,
    });

    if (!check.exists) {
        await createDatabase({ options, synchronize: false, ifNotExist: true });
    }

    logger.info('Establishing database connection...');

    const dataSource = new DataSource(options);
    await dataSource.initialize();

    setDataSource(dataSource);

    logger.info('Established database connection.');

    if (!check.schema) {
        logger.info('Applying database schema...');

        await synchronizeDatabaseSchema(dataSource);

        logger.info('Applied database schema.');
    }

    if (!check.schema) {
        await setupAuthupService();
    }

    const router = createRouter();
    const httpServer = createHttpServer({ router });

    config.components.forEach((c) => c.start());
    config.aggregators.forEach((a) => a.start());

    httpServer.listen(useEnv('port'), '0.0.0.0', () => {
        logger.info('Started http server.');
    });
}
