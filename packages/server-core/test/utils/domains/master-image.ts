/*
 * Copyright (c) 2022-2024.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type { MasterImage } from '@privateaim/core-kit';
import type { TestAgent } from '../supertest';

export const TEST_DEFAULT_MASTER_IMAGE : Partial<MasterImage> = {
    group_virtual_path: 'python',
    name: 'base',
    path: 'data\\python\\base',
    virtual_path: 'python/base',
};

export async function createSuperTestMasterImage(superTest: TestAgent, entity?: Partial<MasterImage>) {
    return superTest
        .post('/master-images')
        .send({
            ...TEST_DEFAULT_MASTER_IMAGE,
            ...(entity || {}),
        })
        .auth('admin', 'start123');
}
