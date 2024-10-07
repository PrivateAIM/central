/*
 * Copyright (c) 2021-2024.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type { HandlerInterface } from '@routup/decorators';
import type {
    Next, Request, Response,
} from 'routup';
import { useRequestIdentityOrFail } from '../request';

export class ForceLoggedInMiddleware implements HandlerInterface {
    public run(request: Request, response: Response, next: Next) {
        useRequestIdentityOrFail(request);

        next();
    }
}
