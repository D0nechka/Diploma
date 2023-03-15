import { Main } from 'pages';
import { PublicRouterPaths, PrivateRouterPaths, RouteItem } from './types';

export const publicRoutes: Record<PublicRouterPaths, RouteItem> = {
    [PublicRouterPaths.MAIN]: {
        path: PublicRouterPaths.MAIN,
        Element: Main,
    },
};

export const privateRoute: Record<PrivateRouterPaths, RouteItem> = {};
