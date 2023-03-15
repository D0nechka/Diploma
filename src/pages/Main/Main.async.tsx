import React from 'react';

const MainAsync = React.lazy(() => import('./Main'));

export {
    MainAsync as Main
};
