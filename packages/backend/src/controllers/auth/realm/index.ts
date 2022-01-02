/*
 * Copyright (c) 2021-2021.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { getRepository } from 'typeorm';
import { applyFilters, applyPagination } from 'typeorm-extension';
import { check, matchedData, validationResult } from 'express-validator';
import { SwaggerTags } from '@trapi/swagger';
import {
    Body, Controller, Delete, Get, Params, Post, Request, Response,
} from '@decorators/express';

import { PermissionID, Realm } from '@personalhealthtrain/ui-common';
import { BadRequestError, ForbiddenError, NotFoundError } from '@typescript-error/http';
import { ForceLoggedInMiddleware } from '../../../config/http/middleware/auth';
import { ExpressRequest, ExpressResponse } from '../../../config/http/type';
import { ExpressValidationError } from '../../../config/http/error/validation';

export async function getManyRouteHandler(req: ExpressRequest, res: ExpressResponse) : Promise<any> {
    const { filter, page } = req.query;
    const realmRepository = getRepository(Realm);

    const query = realmRepository.createQueryBuilder('realm');

    applyFilters(query, filter, {
        defaultAlias: 'realm',
        allowed: ['id', 'name'],
    });

    const pagination = applyPagination(query, page, { maxLimit: 50 });

    const [entities, total] = await query.getManyAndCount();

    return res.respond({
        data: {
            data: entities,
            meta: {
                total,
                ...pagination,
            },
        },
    });
}

export async function getRouteHandler(req: ExpressRequest, res: ExpressResponse) : Promise<any> {
    const { id } = req.params;

    if (typeof id !== 'string') {
        throw new BadRequestError();
    }

    const realmRepository = getRepository(Realm);

    const result = await realmRepository.findOne(id);

    if (typeof result === 'undefined') {
        throw new NotFoundError();
    }

    return res.respond({
        data: result,
    });
}

// ---------------------------------------------------------------------------------

async function runValidation(
    req: ExpressRequest,
    operation: 'create' | 'update',
) {
    if (operation === 'create') {
        await check('id')
            .exists()
            .notEmpty()
            .isString()
            .isLength({ min: 3, max: 36 })
            .matches(/^[a-z0-9-_]*$/)
            .run(req);
    }

    const nameChain = await check('name')
        .exists()
        .notEmpty()
        .isString()
        .isLength({ min: 3, max: 128 });

    if (operation === 'update') nameChain.optional({ nullable: true });

    await nameChain.run(req);

    await check('description')
        .exists()
        .notEmpty()
        .isString()
        .isLength({ min: 5, max: 4096 })
        .optional({ nullable: true })
        .run(req);
}

// ---------------------------------------------------------------------------------

export async function addRouteHandler(req: ExpressRequest, res: ExpressResponse) : Promise<any> {
    if (!req.ability.hasPermission(PermissionID.REALM_ADD)) {
        throw new ForbiddenError('You are not permitted to add a realm.');
    }

    await runValidation(req, 'create');

    const validation = validationResult(req);
    if (!validation.isEmpty()) {
        throw new ExpressValidationError(validation);
    }

    const data = matchedData(req, { includeOptionals: false });
    if (!data) {
        return res.respondAccepted();
    }

    const realmRepository = getRepository(Realm);

    const realm = realmRepository.create(data);

    await realmRepository.save(realm);

    return res.respondCreated({
        data: realm,
    });
}

// ---------------------------------------------------------------------------------

export async function editRouteHandler(req: ExpressRequest, res: ExpressResponse) : Promise<any> {
    const { id } = req.params;

    if (!req.ability.hasPermission(PermissionID.REALM_EDIT)) {
        throw new ForbiddenError('You are not permitted to edit a realm.');
    }

    await runValidation(req, 'update');

    const validation = validationResult(req);
    if (!validation.isEmpty()) {
        throw new ExpressValidationError(validation);
    }

    const data = matchedData(req, { includeOptionals: false });
    if (!data) {
        return res.respondAccepted();
    }

    const realmRepository = getRepository(Realm);

    let realm = await realmRepository.findOne(id);
    if (typeof realm === 'undefined') {
        throw new NotFoundError();
    }

    realm = realmRepository.merge(realm, data);

    await realmRepository.save(realm);

    return res.respond({
        data: realm,
    });
}

// ---------------------------------------------------------------------------------

export async function dropRouteHandler(req: ExpressRequest, res: ExpressResponse) : Promise<any> {
    const { id } = req.params;

    if (!req.ability.hasPermission(PermissionID.REALM_DROP)) {
        throw new ForbiddenError('You are not allowed to drop a realm.');
    }

    const repository = getRepository(Realm);

    const entity = await repository.findOne(id);

    if (typeof entity === 'undefined') {
        throw new NotFoundError();
    }

    if (!entity.drop_able) {
        throw new BadRequestError('The realm can not be deleted in general.');
    }

    await repository.delete(id);

    return res.respondDeleted();
}

@SwaggerTags('auth')
@Controller('/realms')
export class RealmController {
    @Get('', [])
    async getMany(
        @Request() req: any,
            @Response() res: any,
    ): Promise<Realm[]> {
        return getManyRouteHandler(req, res);
    }

    @Post('', [ForceLoggedInMiddleware])
    async add(
        @Body() user: NonNullable<Realm>,
            @Request() req: any,
            @Response() res: any,
    ) : Promise<Realm> {
        return addRouteHandler(req, res);
    }

    @Get('/:id', [])
    async get(
        @Params('id') id: string,
            @Request() req: any,
            @Response() res: any,
    ): Promise<Realm> {
        return getRouteHandler(req, res);
    }

    @Post('/:id', [ForceLoggedInMiddleware])
    async edit(
        @Params('id') id: string,
            @Body() user: NonNullable<Realm>,
            @Request() req: any,
            @Response() res: any,
    ) : Promise<Realm> {
        return editRouteHandler(req, res);
    }

    @Delete('/:id', [ForceLoggedInMiddleware])
    async drop(
        @Params('id') id: string,
            @Request() req: any,
            @Response() res: any,
    ) : Promise<Realm> {
        return dropRouteHandler(req, res);
    }
}
