import React from 'react';

const ArtistsAsync = React.lazy(() => import('./Artists'));

export {
    ArtistsAsync as Artists
};
