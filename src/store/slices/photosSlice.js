import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';
import { setError, setStatus } from '../../services/reducerService';

const SLICE_NAME = 'photos';

const initialState = {
  photos: [],
  status: null,
  error: null,
};

// Get Album Photos
export const getAlbumPhotos = createAsyncThunk(
  `${SLICE_NAME}/getAlbumPhotos`,
  async function (id, { rejectWithValue }) {
    try {
      const { status, data } = await api.get(`/${SLICE_NAME}?albumId=${id}`);
      if (status >= 400) {
        throw new Error(`Error status is ${status}`);
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const photosSlice = createSlice({
  name: SLICE_NAME,
  initialState,

  extraReducers: (builder) => {
    // Success
    builder.addCase(getAlbumPhotos.fulfilled, (state, { payload }) => {
      state.photos = payload;
      state.status = 'fulfilled';
      state.error = null;
    });

    // Error
    builder.addCase(getAlbumPhotos.rejected, setError);

    // Pending
    builder.addCase(getAlbumPhotos.pending, setStatus);
  },
});

export default photosSlice.reducer;