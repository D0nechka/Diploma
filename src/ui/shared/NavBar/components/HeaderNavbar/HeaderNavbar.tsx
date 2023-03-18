import { Button, ButtonSize, ButtonType, Text, TextSize } from 'ui/components/kit';
import { ImExit } from 'react-icons/im';
import { Logo } from 'ui/components/icons';
import { EMAIL_LOCALSTORAGE_KEY, ROLES_LOCALSTORAGE_KEY, USER_LOCALSTORAGE_KEY } from 'config/const/localStorage';
import { changeUserEmail, getUserEmail } from 'store/slices/userSlice/userSlice';
import { useAppDispatch,useAppSelector } from 'hooks';
import { FaUserAlt } from 'react-icons/fa';
import { RiAdminFill } from 'react-icons/ri';
import cls from './style.module.scss';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

interface HeaderNavbarProps {
    isAdmin: boolean;
    roles: string[];
    isHide: boolean;
}

export const HeaderNavbar = ({
    isAdmin,
    roles,
    isHide,
}: HeaderNavbarProps) => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const email = useAppSelector(getUserEmail);

    const handleLogout = () => {
        dispatch(changeUserEmail(''));
        localStorage.removeItem(USER_LOCALSTORAGE_KEY);
        localStorage.removeItem(EMAIL_LOCALSTORAGE_KEY);
        localStorage.removeItem(ROLES_LOCALSTORAGE_KEY);
        navigate('/');
        window.location.reload();
    };

    return (
        <>
            <div className={cls.logoContainer}>
                <Logo />
                <Text
                    className={classNames(cls.logoText, {
                        [cls.logoTextHide]: !isHide,
                    })}
                    textSize={TextSize.L}
                >Русская музыка</Text>
            </div>
            <div className={cls.profile}>
                {isAdmin
                    ? <RiAdminFill className={cls.userLogo} />
                    : <FaUserAlt className={cls.userLogo}/>
                }
                <div className={classNames(cls.containerInfoUser, {
                    [cls.containerInfoUserHide]: !isHide,
                })}>
                    <div className={cls.roles}>
                        {roles?.map((role, index) => (
                            <Text
                                key={role}
                                className={index !== 0 ? cls.role : ''}
                            >{role}</Text>
                        ))}
                    </div>
                    <Text>{email}</Text>
                </div>
            </div>
            <div className={cls.quitBtnContainer}>
                <Button
                    btnType={ButtonType.OUTLINE}
                    className={cls.quitBtn}
                    btnSize={ButtonSize.L}
                    onClick={handleLogout}
                >
                    <ImExit/>
                </Button>
            </div>
        </>
    );
};
