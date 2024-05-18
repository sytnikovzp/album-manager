import { configureStore } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';

import albumsReducer from './slices/albumSlice';
import photosReducer from './slices/photosSlice';

export default configureStore({
    reducer: {
        albumsList: albumsReducer,
        photosList: photosReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})