import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';
import { setError, setStatus } from '../../services/reducerService';

const SLICE_NAME = 'users';

const initialState = {
  users: [],
  status: null,
  error: null,
};

// Get Users
export const getAllUsers = createAsyncThunk(
  `${SLICE_NAME}/getAllUsers`,
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

// Create user
export const createUser = createAsyncThunk(
  `${SLICE_NAME}/createUser`,
  async (user, { rejectWithValue }) => {
    try {
      const { status, data } = await api.post(`/${SLICE_NAME}`, user);
      if (status >= 400) {
        throw new Error(`Can't create user. Error status is ${status}`);
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update user
export const updateUser = createAsyncThunk(
  `${SLICE_NAME}/updateUser`,
  async (user, { rejectWithValue }) => {
    try {
      const { status, data } = await api.put(`/${SLICE_NAME}/${user.id}`, user);
      if (status >= 400) {
        throw new Error(`Can't update user. Error status is ${status}`);
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete user
export const deleteUser = createAsyncThunk(
  `${SLICE_NAME}/deleteUser`,
  async function (id, { rejectWithValue }) {
    try {
      const { status } = await api.delete(`/${SLICE_NAME}/${id}`);
      if (status >= 400) {
        throw new Error(`Can't delete user. Error status is ${status}`);
      }
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const usersSlice = createSlice({
  name: SLICE_NAME,
  initialState,

  extraReducers: (builder) => {
    // Success
    builder.addCase(getAllUsers.fulfilled, (state, { payload }) => {
      state.users = payload;
      state.status = 'fulfilled';
      state.error = null;
    });

    builder.addCase(createUser.fulfilled, (state, { payload }) => {
      state.users.push(payload);
      state.status = 'fulfilled';
      state.error = null;
    });

    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      state.users = state.users.map((user) =>
        user.id !== payload.id ? user : payload
      );
      state.status = 'fulfilled';
      state.error = null;
    });

    builder.addCase(deleteUser.fulfilled, (state, { payload }) => {
      state.users = state.users.filter((user) => user.id !== payload);
      state.status = 'fulfilled';
      state.error = null;
    });

    // Pending
    builder.addCase(getAllUsers.pending, setStatus);
    builder.addCase(createUser.pending, setStatus);
    builder.addCase(updateUser.pending, setStatus);
    builder.addCase(deleteUser.pending, setStatus);

    // Error
    builder.addCase(getAllUsers.rejected, setError);
    builder.addCase(createUser.rejected, setError);
    builder.addCase(updateUser.rejected, setError);
    builder.addCase(deleteUser.rejected, setError);
  },
});

export default usersSlice.reducer;
