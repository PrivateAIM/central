/*
 * Copyright (c) 2022-2024.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { ForbiddenError, NotFoundError } from '@ebec/http';
import { isRealmResourceWritable } from '@authup/core-kit';
import { PermissionName } from '@privateaim/kit';
import type { Request, Response } from 'routup';
import { sendAccepted, useRequestParam } from 'routup';
import { useDataSource } from 'typeorm-extension';
import { useRequestEnv } from '@privateaim/server-http-kit';
import { AnalysisNodeEntity } from '../../../../../domains';
import { runAnalysisNodeValidation } from '../utils';

export async function updateAnalysisNodeRouteHandler(req: Request, res: Response) : Promise<any> {
    const id = useRequestParam(req, 'id');

    const dataSource = await useDataSource();
    const repository = dataSource.getRepository(AnalysisNodeEntity);
    let entity = await repository.findOneBy({ id });

    if (!entity) {
        throw new NotFoundError();
    }

    const ability = useRequestEnv(req, 'abilities');

    const isAuthorityOfNode = isRealmResourceWritable(useRequestEnv(req, 'realm'), entity.node_realm_id);
    const isAuthorityOfAnalysis = isRealmResourceWritable(useRequestEnv(req, 'realm'), entity.analysis_realm_id);

    if (!isAuthorityOfNode && !isAuthorityOfAnalysis) {
        throw new ForbiddenError();
    }

    const canUpdate = ability.has(PermissionName.ANALYSIS_UPDATE);
    const canApprove = ability.has(PermissionName.ANALYSIS_APPROVE);

    if (!canUpdate && !canApprove) {
        throw new ForbiddenError();
    }

    const result = await runAnalysisNodeValidation(req, 'update');

    if (!isAuthorityOfNode || !canApprove) {
        if (result.data.approval_status) {
            delete result.data.approval_status;
        }

        if (result.data.comment) {
            delete result.data.comment;
        }
    }

    if (!isAuthorityOfNode || !canUpdate) {
        if (result.data.run_status) {
            delete result.data.run_status;
        }
    }

    if (!isAuthorityOfAnalysis || !canUpdate) {
        if (result.data.index) {
            delete result.data.index;
        }
    }

    entity = repository.merge(entity, result.data);

    entity = await repository.save(entity);

    return sendAccepted(res, entity);
}
