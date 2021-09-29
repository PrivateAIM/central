/*
 * Copyright (c) 2021-2021.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import {useApi} from "@/modules/api";
import {changeRequestKeyCase, formatRequestRecord, RequestRecord} from "~/modules/api/utils";
import {clearObjectProperties} from "~/modules/utils";

export async function getRoles(data?: RequestRecord) {
    try {
        let response = await useApi('auth').get('roles'+formatRequestRecord(data));

        return response.data;
    } catch (e) {
        throw new Error('Die Rollen konnten nicht geladen werden.');
    }
}

export async function getRole(roleId: number) {
    try {
        let response = await useApi('auth').get('roles/'+roleId);

        return response.data;
    } catch (e) {
        throw new Error('Die Rolle konnte nicht geladen werden.');
    }
}

export async function dropRole(roleId: number) {
    try {
        let response = await useApi('auth').delete('roles/'+roleId);

        return response.data;
    } catch (e) {
        throw new Error('Die Rolle konnte nicht gelöscht werden.');
    }
}

export async function addRole(data: {[key: string] : any}) {
    try {
        let response = await useApi('auth').post('roles', clearObjectProperties(changeRequestKeyCase(data)));

        return response.data;
    } catch (e) {
        throw new Error('Die Rolle konnte nicht erstellt werden.');
    }
}

export async function editRole(id : number, data: {[key: string] : any}) {
    try {
        let response = await useApi('auth').post('roles/'+id, clearObjectProperties(changeRequestKeyCase(data)));

        return response.data;
    } catch (e) {
        throw new Error('Die Rolle konnte nicht erstellt werden.');
    }
}
