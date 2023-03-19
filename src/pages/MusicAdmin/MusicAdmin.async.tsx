import React from 'react';

const MusicAdminAsync = React.lazy(() => import('./MusicAdmin'));

export {
    MusicAdminAsync as MusicAdmin
};
