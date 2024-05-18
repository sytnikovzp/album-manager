import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';
import { setError, setStatus } from '../../services/reducerService';

const SLICE_NAME = 'albums';

const initialState = {
  albums: [],
  status: null,
  error: null,
};

// Get Albums
export const getAlbums = createAsyncThunk(
  `${SLICE_NAME}/getAlbums`,
  async function (_, { rejectWithValue }) {
    try {
      const { status, data } = await api.get(`/${SLICE_NAME}`);
      if (status >= 400) {
        throw new Error(`Error status is ${status}`);
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Get user albums
export const getUserAlbums = createAsyncThunk(
  `${SLICE_NAME}/getUserAlbums`,
  async function (id, { rejectWithValue }) {
    try {
      const { status, data } = await api.get(`/${SLICE_NAME}?userId=${id}`);
      if (status >= 400) {
        throw new Error(`Error status is ${status}`);
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const albumsSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    // Success
    builder.addCase(getAlbums.fulfilled, (state, { payload }) => {
      state.albums = payload;
      state.status = 'fulfilled';
      state.error = null;
    });

    builder.addCase(getUserAlbums.fulfilled, (state, { payload }) => {
      state.albums = payload;
      state.status = 'fulfilled';
      state.error = null;
    });

    // Error
    builder.addCase(getAlbums.rejected, setError);
    builder.addCase(getUserAlbums.rejected, setError);

    // Pending
    builder.addCase(getAlbums.pending, setStatus);
    builder.addCase(getUserAlbums.pending, setStatus);
  },
});

export default albumsSlice.reducer;
