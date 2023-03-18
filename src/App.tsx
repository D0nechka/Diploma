import { EMAIL_LOCALSTORAGE_KEY, ROLES_LOCALSTORAGE_KEY, USER_LOCALSTORAGE_KEY } from 'config/const/localStorage';
import { Router } from 'config/router';
import { useAppDispatch } from 'hooks';
import { useEffect } from 'react';
import { changeUserEmail, changeUserRoles } from 'store/slices/userSlice/userSlice';
import { NavBar } from 'ui/shared';

export const App = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const roles = JSON.parse(localStorage.getItem(ROLES_LOCALSTORAGE_KEY) || '[]') || [];
        const email = localStorage.getItem(EMAIL_LOCALSTORAGE_KEY) || '';

        dispatch(changeUserEmail(email));
        dispatch(changeUserRoles(roles));

    }, []);

    return (
        <>
            {localStorage.getItem(USER_LOCALSTORAGE_KEY) ? <NavBar/> : null}
            <Router />
        </>
    );
};
