/*
 * Copyright (c) 2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { useRequestQuery } from '@routup/basic/query';
import type { Request, Response } from 'routup';
import { send, useRequestParam } from 'routup';
import type { SelectQueryBuilder } from 'typeorm';
import { PermissionID } from '@personalhealthtrain/core';
import type { ParseAllowedOption } from 'rapiq';
import {
    parseQueryFields,
} from 'rapiq';
import {
    applyFilters, applyPagination, applyQueryFieldsParseOutput, applyRelations, useDataSource,
} from 'typeorm-extension';
import { ForbiddenError, NotFoundError } from '@ebec/http';
import { onlyRealmWritableQueryResources } from '../../../../../domains';
import { StationEntity } from '../../../../../domains/station/entity';
import { useRequestEnv } from '../../../../request';

async function checkAndApplyFields(req: Request, query: SelectQueryBuilder<any>, fields: any) {
    const protectedFields : ParseAllowedOption<StationEntity> = [
        'public_key',
        'email',
    ];

    const fieldsParsed = parseQueryFields<StationEntity>(fields, {
        default: [
            'id',
            'name',
            'ecosystem',
            'external_name',
            'hidden',
            'realm_id',
            'registry_id',
            'registry_project_id',
            'created_at',
            'updated_at',
        ],
        allowed: protectedFields,
        defaultPath: 'station',
    });

    const protectedSelected = fieldsParsed
        .filter((field) => field.path === 'station' &&
            protectedFields.indexOf(field.key as any) !== -1);

    if (protectedSelected.length > 0) {
        const ability = useRequestEnv(req, 'ability');

        if (
            !ability.has(PermissionID.NODE_EDIT)
        ) {
            throw new ForbiddenError(
                `You are not permitted to read the restricted fields: ${
                    protectedSelected.map((field) => field.key).join(', ')}`,
            );
        }

        onlyRealmWritableQueryResources(query, useRequestEnv(req, 'realm'), 'station.realm_id');
    }

    applyQueryFieldsParseOutput(query, fieldsParsed, { defaultAlias: 'station' });
}

export async function getOneStationRouteHandler(req: Request, res: Response) : Promise<any> {
    const id = useRequestParam(req, 'id');
    const { fields, include } = useRequestQuery(req);

    const dataSource = await useDataSource();
    const repository = dataSource.getRepository(StationEntity);
    const query = repository.createQueryBuilder('station')
        .where('station.id = :id', { id });

    await checkAndApplyFields(req, query, fields);

    applyRelations(query, include, {
        defaultAlias: 'station',
        allowed: ['registry_project', 'registry'],
    });

    const entity = await query.getOne();

    if (!entity) {
        throw new NotFoundError();
    }

    return send(res, entity);
}

export async function getManyStationRouteHandler(req: Request, res: Response) : Promise<any> {
    const {
        filter, page, fields, include,
    } = useRequestQuery(req);

    const dataSource = await useDataSource();
    const repository = dataSource.getRepository(StationEntity);
    const query = repository.createQueryBuilder('station');

    await checkAndApplyFields(req, query, fields);

    applyRelations(query, include, {
        defaultAlias: 'station',
        allowed: ['registry_project', 'registry'],
    });

    applyFilters(query, filter, {
        allowed: ['id', 'name', 'hidden', 'realm_id'],
        defaultAlias: 'station',
    });

    const pagination = applyPagination(query, page, { maxLimit: 50 });

    const [entities, total] = await query.getManyAndCount();

    return send(res, {
        data: entities,
        meta: {
            total,
            ...pagination,
        },
    });
}
