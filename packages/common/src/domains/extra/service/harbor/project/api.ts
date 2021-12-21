/*
 * Copyright (c) 2021-2021.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { APIType, useAPI } from '../../../../../modules';
import { findHarborProjectWebHook } from './web-hook';
import { findHarborRobotAccount } from '../robot-account';
import { HarborProject, HarborProjectCreateContext } from './type';

export async function findHarborProject(id: string | number, isProjectName = false) : Promise<HarborProject> {
    const headers : Record<string, any> = {};

    if (isProjectName) {
        headers['X-Is-Resource-Name'] = true;
    }

    try {
        const { data } = await useAPI(APIType.HARBOR)
            .get(`projects/${id}`);

        return {
            name: data.name,
            id: data.project_id,
        };
    } catch (e) {
        if (e.response.status === 404) {
            return undefined;
        }

        throw e;
    }
}

export async function ensureHarborProject(data: HarborProjectCreateContext) {
    try {
        await useAPI(APIType.HARBOR)
            .post('projects', data);

        return await findHarborProject(data.project_name, true);
    } catch (e) {
        if (e.response.status === 409) {
            return findHarborProject(data.project_name, true);
        }

        throw e;
    }
}

export async function deleteHarborProject(id: string | number, isProjectName = false) {
    const headers : Record<string, any> = {};

    if (isProjectName) {
        headers['X-Is-Resource-Name'] = true;
    }

    await useAPI(APIType.HARBOR)
        .delete(`projects/${id}`, headers);
}

export async function pullProject(
    id: string | number,
    isProjectName = false,
) : Promise<HarborProject | undefined> {
    const project = await findHarborProject(id, isProjectName);

    if (!project) {
        return undefined;
    }

    project.webhook = await findHarborProjectWebHook(id, isProjectName);
    project.robot_account = await findHarborRobotAccount(project.name, true);

    return project;
}
