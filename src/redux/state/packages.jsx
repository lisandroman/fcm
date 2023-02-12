import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const PACKAGES_URL = "http://localhost:8080/api/coinsPackages";

const initialState = {
  coins: [],
  status: "idle",
  error: null,
};

export const fetchPackages = createAsyncThunk("packages/fetchPackages", async () => {
  const response = await axios.get(PACKAGES_URL);
  console.log('response:', response) 
  return response.data;
});

export const packagesSlice = createSlice({
  name: "packages",
  initialState,

  reducers: {
    loadPackages: (state, action) => {
      // state.packages.push({ ...action.payload });
      return action.payload;
    },
  },

  extraReducers(builder) {
    builder

      .addCase(fetchPackages.pending, (state, action) => {
        state.status = "loading";
      })

      .addCase(fetchPackages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.coins = state.coins.concat(action.payload);
      })

      .addCase(fetchPackages.rejected, (state, action) => {
        state.status = "idle";
      });
  },
});

export const allPackages = (state) => state.packages.coins;
export const getDataStatus = (state) => state.packages.status;
export const getDataErrors = (state) => state.packages.error;

export const { loadPackages } = packagesSlice.actions;

export default packagesSlice.reducer;
