import { EMAIL_LOCALSTORAGE_KEY, ROLES_LOCALSTORAGE_KEY, USER_LOCALSTORAGE_KEY } from 'config/const/localStorage';
import { useAppDispatch, useAppSelector } from 'hooks';
import { changeUserEmail, getUserEmail, getUserRoles } from 'store/slices/userSlice/userSlice';

const PrivateMain = () => {
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

    return (
        <div>
           Private
            <br />
            <span>{email} - email</span>
            <br />
            <span>{roles?.map((item) => (
                <>
                    <span
                        key={item}
                    >{item} - role</span>
                    <br />
                </>
            ))}</span>
            <br />
            <button onClick={handleLogout}>logout</button>
        </div>
    );
};

export default PrivateMain;
