import { EMAIL_LOCALSTORAGE_KEY, getLocalStorageRoles, USER_LOCALSTORAGE_KEY } from 'config/const/localStorage';
import { Router } from 'config/router';
import { useAppDispatch } from 'hooks';
import { useEffect } from 'react';
import { changeUserEmail, changeUserRoles } from 'store/slices/userSlice/userSlice';
import { Navbar } from 'ui/shared';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export const App = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const roles = getLocalStorageRoles;
        const email = localStorage.getItem(EMAIL_LOCALSTORAGE_KEY) || '';

        dispatch(changeUserEmail(email));
        dispatch(changeUserRoles(roles));
    }, []);

    return (
        <div className='app'>
            {localStorage.getItem(USER_LOCALSTORAGE_KEY) && <Navbar />}
            <Router />
            <ToastContainer />
        </div>
    );
};
