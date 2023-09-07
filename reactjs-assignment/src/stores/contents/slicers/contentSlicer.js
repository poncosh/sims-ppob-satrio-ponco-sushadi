import { createSlice } from "@reduxjs/toolkit";
import {
  getBanner,
  getServices,
  getTransactionHistory,
} from "../reducers/contentReducer";

export const contentSlice = createSlice({
  name: "content",
  initialState: {
    isLoading: false,
    services: [],
    banners: [],
    userTransaction: [],
  },
  extraReducers: {
    [getServices.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getServices.fulfilled.type]: (state, { payload }) => {
      state.services = payload;
      state.isLoading = false;
    },
    [getBanner.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getBanner.fulfilled.type]: (state, { payload }) => {
      state.banners = payload;
      state.isLoading = false;
    },
    [getTransactionHistory.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getTransactionHistory.fulfilled.type]: (state, { payload }) => {
      state.userTransaction = payload;
      state.isLoading = false;
    },
  },
});

export default contentSlice.reducer;
