import { createAsyncThunk } from "@reduxjs/toolkit";
import { useApiPrivate } from "../../../composables/useApi";

export const getServices = createAsyncThunk("content/services", async () => {
  try {
    const { data } = await useApiPrivate().get("/services");

    return data.data;
  } catch (error) {
    return { error: true, msg: error.response.data.message };
  }
});
