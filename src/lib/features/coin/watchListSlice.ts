import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { coinType } from "@/types/companyHoldings";

interface WatchListState {
  results: { [key: string]: coinType };
}

const loadState = (): WatchListState => {
  try {
    const storedState = localStorage.getItem("watchListItems");
    if (!storedState) return { results: {} };
    return JSON.parse(storedState);
  } catch (err) {
    return { results: {} };
  }
};

const saveState = (state: WatchListState) => {
  try {
    const storeState = JSON.stringify(state);
    localStorage.setItem("watchListItems", storeState);
  } catch (err) {
    console.error("write error occured");
  }
};

const initialState: WatchListState = loadState();

const watchListSlice = createSlice({
  name: "watchList",
  initialState,
  reducers: {
    addToWatchList: (
      state,
      action: PayloadAction<{ [key: string]: coinType }>
    ) => {
      state.results = { ...state.results, ...action.payload };
      console.log(state.results);
      saveState(state);
    },
    removeFromWatchList: (
      state,
      action: PayloadAction<{ [key: string]: coinType }>
    ) => {
     // remove item logic
      saveState(state);
    },
    clearWatchList: (state) => {
      state.results = {};
      saveState(state);
    },
  },
});

export const { addToWatchList, removeFromWatchList, clearWatchList } =
  watchListSlice.actions;
export default watchListSlice.reducer;
