import { Route, Routes } from 'react-router-dom';
import { publicRoutes } from '../const';

export const Router = () => (
    <Routes>
        {Object.values(publicRoutes).map(({ path, Element, }) => (
            <Route key={path} path={path} element={<Element />} />
        ))}
    </Routes>
);
