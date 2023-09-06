import { createSlice } from "@reduxjs/toolkit";
import { getServices } from "../reducers/contentReducer";

export const contentSlice = createSlice({
  name: "content",
  initialState: {
    isLoading: false,
    services: [],
  },
  extraReducers: {
    [getServices.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getServices.fulfilled.type]: (state, { payload }) => {
      state.services = payload;
      state.isLoading = false;
    },
  },
});

export default contentSlice.reducer;
