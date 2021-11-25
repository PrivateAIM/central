/*
 * Copyright (c) 2021-2021.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { Message, buildMessage } from 'amqp-extension';
import { MessageQueueTrainRouterRoutingKey } from '../../../config/service/mq';

// -------------------------------------------

export enum TrainRouterHarborEvent {
    TRAIN_PUSHED = 'trainPushed'
}

export type TrainRouterHarborEventPayload = {
    repositoryFullName: string,
    operator: string
}

// -------------------------------------------

export enum TrainRouterCommand {
    START = 'startTrain',
    STOP = 'stopTrain'
}

export type TrainRouterCommandPayload = {
    trainId: string
};

// -------------------------------------------

export function buildTrainRouterQueueMessage<T extends TrainRouterCommand | TrainRouterHarborEvent>(
    type: T,
    data: T extends TrainRouterCommand ? TrainRouterCommandPayload : TrainRouterHarborEventPayload,
    metaData: Record<string, any> = {},
) : Message {
    return buildMessage({
        options: {
            routingKey: MessageQueueTrainRouterRoutingKey.COMMAND_OUT,
        },
        type,
        data,
        metadata: metaData,
    });
}
