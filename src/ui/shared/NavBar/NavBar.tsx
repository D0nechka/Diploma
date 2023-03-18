import { useAppDispatch, useAppSelector } from 'hooks';
import { useEffect, useState } from 'react';
import { changeNavbarHide, getNavbarHide } from 'store/slices/navbarSlice/navbarSlice';
import { getUserRoles } from 'store/slices/userSlice/userSlice';
import { Button } from 'ui/components/kit';
import { HeaderNavbar, Links } from './components';
import { adminLinks, userLinks } from './const';
import cls from './style.module.scss';
import { GlobalTypeLinks } from './types';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import classNames from 'classnames';

export const Navbar = () => {
    const [ currentLinks, setCurrentLinks ] = useState<GlobalTypeLinks | null>(null);

    const dispatch = useAppDispatch();

    const isHide = useAppSelector(getNavbarHide);
    const roles = useAppSelector(getUserRoles);
    const isAdmin = roles.includes('ADMIN');

    const onHideNavbar = () => dispatch(changeNavbarHide());

    useEffect(() => {
        if(isAdmin) {
            setCurrentLinks(adminLinks);
        } else {
            setCurrentLinks(userLinks);
        }
    }, [ roles, isAdmin ]);

    console.log(Object.entries(currentLinks ?? {}));

    return (
        <div className={classNames(cls.navContainer, {
            [cls.hideNavbar]: !isHide,
        })}>
            <div className={cls.wrapperContainer}>
                <HeaderNavbar isHide={isHide} roles={roles} isAdmin={isAdmin} />
                <Links isHide={isHide} currentLinks={currentLinks} />
            </div>
            <Button
                className={cls.hideBtn}
                onClick={onHideNavbar}
            >{isHide ? <AiOutlineArrowLeft /> : <AiOutlineArrowRight />}</Button>
        </div>
    );
};
