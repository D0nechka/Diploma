import { GeneralLinks, AdminLinks, generalRus, adminRus } from './types';
import { AdminRouterPaths, PrivateRouterPaths } from 'config/router/ui/types';
import { FaUserGraduate, FaUserSecret } from 'react-icons//fa';
import { MdQueueMusic } from 'react-icons/md';
import { GiMustache, GiPoliceOfficerHead } from 'react-icons/gi';
import { BsFillFileEarmarkMusicFill } from 'react-icons/bs';

export const userLinks: GeneralLinks = {
    [generalRus]: [
        {
            to: PrivateRouterPaths.PROFILE,
            name: 'Профиль',
            icon: FaUserGraduate,
        },
        {
            to: PrivateRouterPaths.MUSIC,
            name: 'Музыка',
            icon: MdQueueMusic,
        },
        {
            to: PrivateRouterPaths.ARTISTS,
            name: 'Исполнители',
            icon: GiMustache,
        }
    ],
};

export const adminLinks: AdminLinks = {
    [generalRus]: userLinks[generalRus],
    [adminRus]: [
        {
            to: AdminRouterPaths.USERS,
            name: 'Пользователи',
            icon: FaUserSecret,
        },
        {
            to: AdminRouterPaths.MUSIC,
            name: 'Музыка',
            icon: BsFillFileEarmarkMusicFill,
        },
        {
            to: AdminRouterPaths.ARTISTS,
            name: 'Исполнители',
            icon: GiPoliceOfficerHead,
        }
    ],
};
