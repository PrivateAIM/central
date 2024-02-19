/*
 * Copyright (c) 2022-2024.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import path from 'node:path';
import {
    createDatabase, dropDatabase, generateMigration,
} from 'typeorm-extension';
import type { CommandModule } from 'yargs';
import type { DataSourceOptions } from 'typeorm';
import { DataSource } from 'typeorm';
import { extendDataSourceOptions } from '../../database';
import { createConfig } from '../../config';

export class MigrationGenerateCommand implements CommandModule {
    command = 'migration:generate';

    describe = 'Generate database migrations.';

    async handler() {
        createConfig();

        const connections : DataSourceOptions[] = [
            {
                type: 'postgres',
                database: 'migrations',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: 'start123',
            },
            {
                type: 'mysql',
                database: 'migrations',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: 'start123',
            },
        ];

        const baseDirectory = path.join(__dirname, '..', '..', 'database', 'migrations');
        const timestamp = Date.now();

        for (let i = 0; i < connections.length; i++) {
            const dataSourceOptions = await extendDataSourceOptions(connections[i]);
            const directoryPath = path.join(baseDirectory, dataSourceOptions.type);

            await dropDatabase({ options: dataSourceOptions });
            await createDatabase({ options: dataSourceOptions, synchronize: false });

            const dataSource = new DataSource(dataSourceOptions);
            await dataSource.initialize();
            await dataSource.runMigrations();

            await generateMigration({
                dataSource,
                name: 'Default',
                directoryPath,
                timestamp,
                prettify: true,
            });
        }

        process.exit(0);
    }
}
