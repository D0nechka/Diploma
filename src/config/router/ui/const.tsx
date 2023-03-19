import { AdminArtists, Artists, Main, Music, MusicAdmin, PrivateMain, Users } from 'pages';
import { PublicRouterPaths, PrivateRouterPaths, RouteItem, AdminRouterPaths } from './types';

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
    [PrivateRouterPaths.PROFILE]: {
        path: PrivateRouterPaths.PROFILE,
        Element: PrivateMain,
    },
    [PrivateRouterPaths.MUSIC]: {
        path: PrivateRouterPaths.MUSIC,
        Element: Music,
    },
    [PrivateRouterPaths.ARTISTS]: {
        path: PrivateRouterPaths.ARTISTS,
        Element: Artists,
    },
};

export const adminRoutes: Record<AdminRouterPaths, RouteItem> = {
    [AdminRouterPaths.USERS]: {
        path: AdminRouterPaths.USERS,
        Element: Users,
    },
    [AdminRouterPaths.MUSIC]: {
        path: AdminRouterPaths.MUSIC,
        Element: MusicAdmin,
    },
    [AdminRouterPaths.ARTISTS]: {
        path: AdminRouterPaths.ARTISTS,
        Element: AdminArtists,
    },
};
