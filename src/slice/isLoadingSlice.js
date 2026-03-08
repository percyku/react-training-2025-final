import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const isLoadingSlice = createSlice({
  name: "loading",
  initialState: {
    isLoading: false,
  },

  reducers: {
    updateLoading(state, action) {
      console.log("action", action.payload);
      state.isLoading = action.payload.isLoading || false;
    },
  },
});

export const createAsynLoading = createAsyncThunk(
  "loading/createAsynLoading",
  async (loading, { dispatch }) => {
    dispatch(updateLoading(loading));
  },
);

export const { updateLoading } = isLoadingSlice.actions;
export default isLoadingSlice.reducer;
