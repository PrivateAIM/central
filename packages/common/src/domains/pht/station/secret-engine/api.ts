/*
 * Copyright (c) 2021-2021.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { APIType, useAPI } from '../../../../modules';
import { StationSecretEngineSecretPayload } from './type';
import { STATION_SECRET_ENGINE_KEY } from './constants';

export async function saveStationSecretsToSecretEngine(
    id: string,
    record: StationSecretEngineSecretPayload,
) {
    try {
        const { data } = await useAPI<APIType.VAULT>(APIType.VAULT)
            .saveKeyValuePair(
                STATION_SECRET_ENGINE_KEY,
                id,
                {
                    data: {
                        rsa_station_public_key: record.publicKey,
                    },
                    options: {
                        cas: 0,
                    },
                },
            );
        return data;
    } catch (e) {
        if (e?.response?.status === 404) {
            // create engine
            await useAPI<APIType.VAULT>(APIType.VAULT)
                .createKeyValueSecretEngine({
                    path: STATION_SECRET_ENGINE_KEY,
                });

            return await saveStationSecretsToSecretEngine(id, record);
        }
    }
}

export async function removeStationSecretsFromSecretEngine(id: string) {
    await useAPI<APIType.VAULT>(APIType.VAULT).dropKeyValuePair(
        STATION_SECRET_ENGINE_KEY,
        id,
    );
}
