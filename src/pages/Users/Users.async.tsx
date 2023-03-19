import React from 'react';

const UsersAsync = React.lazy(() => import('./Users'));

export {
    UsersAsync as Users
};
