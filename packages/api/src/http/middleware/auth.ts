/*
 * Copyright (c) 2021-2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { UnauthorizedError } from '@ebec/http';
import { HandlerInterface } from '@routup/decorators';
import {
    Next, Request, Response,
} from 'routup';
import { useRequestEnv } from '../request';

export function forceLoggedInMiddleware(req: Request, res: Response, next: Next) {
    if (
        typeof useRequestEnv(req, 'userId') === 'undefined' &&
        typeof useRequestEnv(req, 'robotId') === 'undefined' &&
        typeof useRequestEnv(req, 'clientId') === 'undefined'
    ) {
        throw new UnauthorizedError();
    }

    next();
}

export class ForceLoggedInMiddleware implements HandlerInterface {
    public run(request: Request, response: Response, next: Next) {
        forceLoggedInMiddleware(request, response, next);
    }
}