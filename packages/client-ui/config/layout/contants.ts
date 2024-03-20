/*
 * Copyright (c) 2021-2024.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type { NavigationItem } from '@vuecs/navigation';
import { PermissionID } from '@privateaim/core';

export enum LayoutKey {
    NAVIGATION_ID = 'navigationId',
    NAVIGATION_SIDE_ID = 'navigationSideId',

    REQUIRED_LOGGED_IN = 'requireLoggedIn',
    REQUIRED_LOGGED_OUT = 'requireLoggedOut',

    REQUIRED_PERMISSIONS = 'requirePermissions',
}

export enum LayoutNavigationID {
    ADMIN = 'admin',
    DEFAULT = 'default',
}

export const LayoutTopNavigation: NavigationItem[] = [
    {
        id: LayoutNavigationID.DEFAULT,
        name: 'Home',
        icon: 'fa fa-home',
    },
    {
        id: LayoutNavigationID.ADMIN,
        name: 'Admin',
        icon: 'fas fa-cog',
        [LayoutKey.REQUIRED_LOGGED_IN]: true,
        [LayoutKey.REQUIRED_PERMISSIONS]: [

        ],
    },
];
export const LayoutSideDefaultNavigation: NavigationItem[] = [
    {
        name: 'Info',
        type: 'link',
        url: '/',
        icon: 'fas fa-info',
        [LayoutKey.REQUIRED_LOGGED_IN]: true,
        rootLink: true,
    },
    {
        name: 'Projects',
        type: 'link',
        url: '/projects',
        icon: 'fas fa-tasks',
        [LayoutKey.REQUIRED_LOGGED_IN]: true,
        [LayoutKey.REQUIRED_PERMISSIONS]: [
            PermissionID.PROJECT_ADD,
            PermissionID.PROJECT_DROP,
            PermissionID.PROJECT_EDIT,
            PermissionID.PROJECT_APPROVE,

            PermissionID.ANALYSIS_ADD,
            PermissionID.ANALYSIS_DROP,
            PermissionID.ANALYSIS_EDIT,
            PermissionID.ANALYSIS_APPROVE,

            PermissionID.ANALYSIS_RESULT_READ,
            PermissionID.ANALYSIS_EXECUTION_START,
            PermissionID.ANALYSIS_EXECUTION_STOP,
        ],
    },
    {
        name: 'Analyses',
        type: 'link',
        url: '/analyses',
        icon: 'fa fa-bar-chart',
        requireLoggedIn: true,
        requirePermissions: [
            PermissionID.ANALYSIS_ADD,
            PermissionID.ANALYSIS_DROP,
            PermissionID.ANALYSIS_EDIT,
            PermissionID.ANALYSIS_APPROVE,

            PermissionID.ANALYSIS_EXECUTION_START,
            PermissionID.ANALYSIS_EXECUTION_STOP,
        ],
    },
    {
        name: 'Others',
        type: 'separator',
    },
    {
        name: 'Login',
        type: 'link',
        url: '/login',
        icon: 'fas fa-sign',
        [LayoutKey.REQUIRED_LOGGED_OUT]: true,
    },
    {
        name: 'Settings',
        type: 'link',
        url: '/settings',
        icon: 'fas fa-cog',
        [LayoutKey.REQUIRED_LOGGED_IN]: true,
    },
];
export const LayoutSideAdminNavigation: NavigationItem[] = [
    {
        name: 'Auth',
        type: 'link',
        icon: 'fas fa-lock',
        [LayoutKey.REQUIRED_LOGGED_IN]: true,
        [LayoutKey.REQUIRED_PERMISSIONS]: [
            PermissionID.REALM_ADD,
            PermissionID.REALM_EDIT,
            PermissionID.REALM_DROP,

            PermissionID.PROVIDER_ADD,
            PermissionID.PROVIDER_EDIT,
            PermissionID.PROVIDER_DROP,

            PermissionID.USER_ADD,
            PermissionID.USER_EDIT,
            PermissionID.USER_DROP,

            PermissionID.ROLE_ADD,
            PermissionID.ROLE_EDIT,
            PermissionID.ROLE_DROP,
            PermissionID.ROLE_PERMISSION_ADD,
            PermissionID.ROLE_PERMISSION_DROP,

            PermissionID.PERMISSION_ADD,
            PermissionID.PERMISSION_EDIT,
            PermissionID.PERMISSION_DROP,
        ],
        children: [
            {
                name: 'Realms',
                type: 'link',
                url: '/admin/realms',
                icon: 'fas fa-university',
                [LayoutKey.REQUIRED_LOGGED_IN]: true,
                [LayoutKey.REQUIRED_PERMISSIONS]: [
                    PermissionID.REALM_ADD,
                    PermissionID.REALM_EDIT,
                    PermissionID.REALM_DROP,

                    PermissionID.PROVIDER_ADD,
                    PermissionID.PROVIDER_DROP,
                    PermissionID.PROJECT_EDIT,
                ],
            },
            {
                name: 'Identity Providers',
                type: 'link',
                url: '/admin/identity-providers',
                icon: 'fas fa-atom',
                [LayoutKey.REQUIRED_LOGGED_IN]: true,
                [LayoutKey.REQUIRED_PERMISSIONS]: [
                    PermissionID.PROVIDER_ADD,
                    PermissionID.PROVIDER_EDIT,
                    PermissionID.PROVIDER_DROP,
                ],
            },
            {
                name: 'Robots',
                type: 'link',
                url: '/admin/robots',
                icon: 'fas fa-robot',
                [LayoutKey.REQUIRED_LOGGED_IN]: true,
                [LayoutKey.REQUIRED_PERMISSIONS]: [
                    PermissionID.ROBOT_ADD,
                    PermissionID.ROBOT_EDIT,
                    PermissionID.ROBOT_DROP,
                ],
            },
            {
                name: 'Users',
                type: 'link',
                url: '/admin/users',
                icon: 'fas fa-user',
                [LayoutKey.REQUIRED_LOGGED_IN]: true,
                [LayoutKey.REQUIRED_PERMISSIONS]: [
                    PermissionID.USER_ADD,
                    PermissionID.USER_EDIT,
                    PermissionID.USER_DROP,
                ],
            },
            {
                name: 'Roles',
                type: 'link',
                url: '/admin/roles',
                icon: 'fas fa-users',
                [LayoutKey.REQUIRED_LOGGED_IN]: true,
                [LayoutKey.REQUIRED_PERMISSIONS]: [
                    PermissionID.ROLE_ADD,
                    PermissionID.ROLE_EDIT,
                    PermissionID.ROLE_DROP,

                    PermissionID.ROLE_PERMISSION_ADD,
                    PermissionID.ROLE_PERMISSION_DROP,
                ],
            },
            {
                name: 'Permissions',
                type: 'link',
                url: '/admin/permissions',
                icon: 'fas fa-key',
                [LayoutKey.REQUIRED_LOGGED_IN]: true,
                [LayoutKey.REQUIRED_PERMISSIONS]: [
                    PermissionID.PERMISSION_ADD,
                    PermissionID.PERMISSION_EDIT,
                    PermissionID.PERMISSION_DROP,
                ],
            },
        ],
    },
    {
        name: 'General',
        type: 'link',
        icon: 'fas fa-globe',
        [LayoutKey.REQUIRED_LOGGED_IN]: true,
        [LayoutKey.REQUIRED_PERMISSIONS]: [
            PermissionID.NODE_ADD,
            PermissionID.NODE_DROP,
            PermissionID.NODE_EDIT,

            PermissionID.SERVICE_MANAGE,
        ],
        children: [
            {
                name: 'Nodes',
                type: 'link',
                url: '/admin/nodes',
                icon: 'fa-solid fa-server',
                [LayoutKey.REQUIRED_LOGGED_IN]: true,
                [LayoutKey.REQUIRED_PERMISSIONS]: [
                    PermissionID.NODE_ADD,
                    PermissionID.NODE_DROP,
                    PermissionID.NODE_EDIT,
                ],
            },
            {
                name: 'Services',
                type: 'link',
                url: '/admin/services',
                icon: 'fa fa-map-signs',
                [LayoutKey.REQUIRED_LOGGED_IN]: true,
                [LayoutKey.REQUIRED_PERMISSIONS]: [
                    PermissionID.SERVICE_MANAGE,
                ],
            },
        ],
    },

];
