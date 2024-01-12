/*
 * Copyright (c) 2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { randomBytes } from 'crypto';
import type { Analysis } from '@personalhealthtrain/core';
import { TrainType } from '@personalhealthtrain/core';
import type { SuperTest, Test } from 'supertest';

export const TEST_DEFAULT_TRAIN : Partial<Analysis> = {
    name: 'development',
    type: TrainType.DISCOVERY,
    hash_signed: randomBytes(40).toString('hex'),
    query: '{"key": "value"}',
};

export async function createSuperTestTrain(superTest: SuperTest<Test>, entity?: Partial<Analysis>) {
    return superTest
        .post('/trains')
        .send({
            ...TEST_DEFAULT_TRAIN,
            ...(entity || {}),
        })
        .auth('admin', 'start123');
}
