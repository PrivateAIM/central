/*
 * Copyright (c) 2021.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import supertest from 'supertest';
import createExpressApp from '../src/config/http/express';

export function useSuperTest() {
    const expressApp = createExpressApp();
    return supertest(expressApp);
}
