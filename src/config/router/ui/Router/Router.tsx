import { getLocalStorageRoles, USER_LOCALSTORAGE_KEY } from 'config/const/localStorage';
import { NotFound } from 'pages';
import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { publicRoutes, privateRoutes, adminRoutes } from '../const';

export const Router = () => {
    const isAdmin = (getLocalStorageRoles).includes('ADMIN');

    return (
        <Suspense fallback="">
            <Routes>
                {localStorage.getItem(USER_LOCALSTORAGE_KEY) ? (
                    Object.values(privateRoutes).map(({ path, Element, }) => (
                        <Route key={path} path={path} element={<Element />} />
                    ))
                ) : (
                    Object.values(publicRoutes).map(({ path, Element, }) => (
                        <Route key={path} path={path} element={<Element />} />
                    ))
                )}
                {isAdmin && (
                    Object.values(adminRoutes).map(({ path, Element, }) => (
                        <Route key={path} path={path} element={<Element />} />
                    ))
                )}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
};
