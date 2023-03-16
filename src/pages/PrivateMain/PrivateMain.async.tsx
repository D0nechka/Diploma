import React from 'react';

const PrivateMainAsync = React.lazy(() => import('./PrivateMain'));

export {
    PrivateMainAsync as PrivateMain
};
