import { createSlice } from "@reduxjs/toolkit";
import { getProfile } from "../reducers/contentReducer";

export const contentSlice = createSlice({
  name: "content",
  initialState: {
    isLoading: false,
    profile: {
      email: null,
      first_name: null,
      last_name: null,
      profile_image: null,
    },
  },
  extraReducers: {
    [getProfile.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getProfile.fulfilled.type]: (state, { payload }) => {
      state.profile = payload;
      state.isLoading = false;
    },
  },
});

export default contentSlice.reducer;
