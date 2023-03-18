import React from 'react';

export enum PublicRouterPaths {
    MAIN = '/'
}

export enum PrivateRouterPaths {
    PRIVATE_MAIN = '/',
    PROFILE = '/profile',
    MUSIC = '/music',
    ARTISTS = '/artists'
}

export enum AdminRouterPaths {
    USERS = '/users',
    MUSIC = '/music-admin',
    ARTISTS = '/artists-admin'
}

export type RouteItem = {
    path: string,
    Element: React.FC
}
