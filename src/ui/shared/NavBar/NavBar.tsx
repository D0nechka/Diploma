import cls from './style.module.scss';
import { Button, ButtonSize, ButtonType, Text } from 'ui/components/kit';
import { ImExit } from 'react-icons/im';
import { Logo } from 'ui/components/icons';
import { EMAIL_LOCALSTORAGE_KEY, ROLES_LOCALSTORAGE_KEY, USER_LOCALSTORAGE_KEY } from 'config/const/localStorage';
import { changeUserEmail, getUserEmail, getUserRoles } from 'store/slices/userSlice/userSlice';
import { useAppDispatch,useAppSelector } from 'hooks';
import { FaUserAlt } from 'react-icons/fa';

export const NavBar = () => {
    const dispatch = useAppDispatch();
    const email = useAppSelector(getUserEmail);
    const roles = useAppSelector(getUserRoles);

    const handleLogout = () => {
        dispatch(changeUserEmail(''));
        localStorage.removeItem(USER_LOCALSTORAGE_KEY);
        localStorage.removeItem(EMAIL_LOCALSTORAGE_KEY);
        localStorage.removeItem(ROLES_LOCALSTORAGE_KEY);
        window.location.reload();
    };

    return(
        <div className={cls.navContainer}>
            <Logo className={cls.logo}/>
            <div className={cls.profile}>
                <div>
                    <FaUserAlt className={cls.userLogo}/>
                </div>
                <Text >
                    {roles?.map((item) => (
                        <>
                            <span
                                key={item}
                            >{item}</span>
                            <br />
                        </>
                    ))}
                    {email}
                </Text>
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
        </div>
    );
};
