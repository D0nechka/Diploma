import React from 'react';

const AdminArtistsAsync = React.lazy(() => import('./AdminArtists'));

export {
    AdminArtistsAsync as AdminArtists
};
