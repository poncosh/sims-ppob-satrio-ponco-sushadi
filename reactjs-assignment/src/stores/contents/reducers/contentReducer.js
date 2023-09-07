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

export const getBanner = createAsyncThunk("content/banner", async () => {
  try {
    const { data } = await useApiPrivate().get("/banner");

    return data.data;
  } catch (error) {
    return { error: true, msg: error.response.data.message };
  }
});

export const getTransactionHistory = createAsyncThunk(
  "content/user-transaction",
  async (limit) => {
    try {
      const { data } = await useApiPrivate().get("/transaction/history", {
        params: {
          limit: limit,
        },
      });

      return data.data.records;
    } catch (error) {
      return { error: true, msg: error.response.data.message };
    }
  }
);
