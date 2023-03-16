import { Main, PrivateMain } from 'pages';
import { PublicRouterPaths, PrivateRouterPaths, RouteItem } from './types';

export const publicRoutes: Record<PublicRouterPaths, RouteItem> = {
    [PublicRouterPaths.MAIN]: {
        path: PublicRouterPaths.MAIN,
        Element: Main,
    },
};

export const privateRoutes: Record<PrivateRouterPaths, RouteItem> = {
    [PrivateRouterPaths.PRIVATE_MAIN]: {
        path: PrivateRouterPaths.PRIVATE_MAIN,
        Element: PrivateMain,
    },
};
