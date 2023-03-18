import { AdminRouterPaths, PrivateRouterPaths } from 'config/router/ui/types';
import { IconType } from 'react-icons';

export const generalRus = 'общие';
export const adminRus = 'админ';

export type GeneralLink = {
    to: PrivateRouterPaths;
    icon: IconType;
    name: string;
}

export type AdminLink = {
    to: AdminRouterPaths;
    icon: IconType;
    name: string;
}

export type GeneralLinks = {
    [generalRus]: GeneralLink[]
}

export type AdminLinks = {
    [adminRus]: AdminLink[]
} & GeneralLinks

export type GlobalTypeLinks = AdminLinks | GeneralLinks
