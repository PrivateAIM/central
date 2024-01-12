/*
 * Copyright (c) 2021-2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type {
    Analysis,
    AnalysisAPICommand,
} from '@personalhealthtrain/core';
import {
    DBody, DController, DDelete, DGet, DPath, DPost, DRequest, DResponse, DTags,
} from '@routup/decorators';
import {
    createTrainRouteHandler,
    deleteTrainRouteHandler,
    getManyTrainRouteHandler,
    getOneTrainRouteHandler,
    handleTrainCommandRouteHandler,
    handleTrainFilesDownloadRouteHandler,
    handleTrainResultDownloadRouteHandler,
    updateTrainRouteHandler,
} from './handlers';
import { ForceLoggedInMiddleware } from '../../../middleware';

type PartialTrain = Partial<Analysis>;

@DTags('train')
@DController('/trains')
export class TrainController {
    @DGet('', [ForceLoggedInMiddleware])
    async getMany(
        @DRequest() req: any,
            @DResponse() res: any,
    ): Promise<PartialTrain[]> {
        return getManyTrainRouteHandler(req, res);
    }

    @DGet('/:id/files/download', [ForceLoggedInMiddleware])
    async getFiles(
        @DPath('id') id: string,
            @DRequest() req: any,
            @DResponse() res: any,
    ): Promise<any> {
        return handleTrainFilesDownloadRouteHandler(req, res);
    }

    @DGet('/:id/result/download', [ForceLoggedInMiddleware])
    async getResult(
        @DPath('id') id: string,
            @DRequest() req: any,
            @DResponse() res: any,
    ): Promise<any> {
        return handleTrainResultDownloadRouteHandler(req, res);
    }

    @DGet('/:id', [ForceLoggedInMiddleware])
    async getOne(
        @DPath('id') id: string,
            @DRequest() req: any,
            @DResponse() res: any,
    ): Promise<PartialTrain | undefined> {
        return getOneTrainRouteHandler(req, res);
    }

    @DPost('/:id', [ForceLoggedInMiddleware])
    async edit(
        @DPath('id') id: string,
            @DBody() data: PartialTrain,
            @DRequest() req: any,
            @DResponse() res: any,
    ): Promise<PartialTrain | undefined> {
        return updateTrainRouteHandler(req, res);
    }

    @DPost('', [ForceLoggedInMiddleware])
    async add(
        @DBody() data: PartialTrain,
            @DRequest() req: any,
            @DResponse() res: any,
    ): Promise<PartialTrain | undefined> {
        return createTrainRouteHandler(req, res);
    }

    @DPost('/:id/command', [ForceLoggedInMiddleware])
    async doTask(
        @DPath('id') id: string,
            @DBody() data: {
                command: AnalysisAPICommand
            },
            @DRequest() req: any,
            @DResponse() res: any,
    ): Promise<PartialTrain | undefined> {
        return handleTrainCommandRouteHandler(req, res);
    }

    @DDelete('/:id', [ForceLoggedInMiddleware])
    async drop(
        @DPath('id') id: string,
            @DRequest() req: any,
            @DResponse() res: any,
    ): Promise<PartialTrain | undefined> {
        return deleteTrainRouteHandler(req, res);
    }

    // --------------------------------------------------------------------------
}
