import { createAsyncThunk } from "@reduxjs/toolkit";
import { useApiPrivate } from "../../../composables/useApi";

export const getProfile = createAsyncThunk("user/profile", async () => {
  try {
    const { data } = await useApiPrivate().get("/profile");

    return data.data;
  } catch (error) {
    console.log(error);
  }
});
