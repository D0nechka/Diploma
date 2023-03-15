import React from 'react';

export enum PublicRouterPaths {
    MAIN = '/'
}

export enum PrivateRouterPaths {
}

export type RouteItem = {
    path: string,
    Element: React.FC
}
