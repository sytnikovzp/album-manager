import { configureStore } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';

import albumsReducer from './slices/albumSlice';
import photosReducer from './slices/photosSlice';
import usersReducer from './slices/usersSlice';

export default configureStore({
  reducer: {
    albumsList: albumsReducer,
    photosList: photosReducer,
    usersList: usersReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
