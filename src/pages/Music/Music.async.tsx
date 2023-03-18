import React from 'react';

const MusicAsync = React.lazy(() => import('./Music'));

export {
    MusicAsync as Music
};
