import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { coinType } from "@/types/companyHoldings";

export const fetchCoinData = createAsyncThunk(
  "coins/fetchCoinData",
  async () => {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/list?include_platform=false"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch coin data");
    }
    const data: coinType[] = await response.json();
    return data;
  }
);

const coinSlice = createSlice({
  name: "coins",
  initialState: {
    coins: [] as coinType[],
    status: "idle",
    error: null as string | null | undefined,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoinData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCoinData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.coins = action.payload;
      })
      .addCase(fetchCoinData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action?.error?.message;
      });
  },
});

export default coinSlice.reducer;
