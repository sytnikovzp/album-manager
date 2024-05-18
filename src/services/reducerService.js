export const setError = (state, { payload }) => {
  state.status = 'rejected';
  state.error = payload;
};

export const setStatus = (state) => {
  state.status = 'pending';
  state.error = null;
};
