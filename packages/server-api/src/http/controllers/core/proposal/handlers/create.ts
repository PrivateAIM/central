/*
 * Copyright (c) 2022-2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { PermissionID } from '@personalhealthtrain/core';
import { ForbiddenError } from '@ebec/http';
import type { Request, Response } from 'routup';
import { sendCreated } from 'routup';
import { useDataSource } from 'typeorm-extension';
import { useRequestEnv } from '../../../../request';
import { ProposalEntity } from '../../../../../domains/proposal/entity';
import { runProposalValidation } from '../utils/validation';

export async function createProposalRouteHandler(req: Request, res: Response) : Promise<any> {
    const ability = useRequestEnv(req, 'ability');
    if (!ability.has(PermissionID.PROJECT_ADD)) {
        throw new ForbiddenError();
    }

    const result = await runProposalValidation(req, 'create');

    const dataSource = await useDataSource();
    const repository = dataSource.getRepository(ProposalEntity);
    const entity = repository.create({
        user_id: useRequestEnv(req, 'userId'),
        ...result.data,
    });

    await repository.save(entity);

    return sendCreated(res, entity);
}
