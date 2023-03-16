import { USER_LOCALSTORAGE_KEY } from 'config/const/localStorage';
import { Route, Routes } from 'react-router-dom';
import { publicRoutes, privateRoutes } from '../const';

export const Router = () => (
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
    </Routes>
);
