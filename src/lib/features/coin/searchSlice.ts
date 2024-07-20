import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { coinType } from "@/types/companyHoldings";

interface SearchState {
  results: { [key: string]: coinType };
}

const loadState = (): SearchState => {
  try {
    const storedState = localStorage.getItem("searchResults");
    if (!storedState) return { results: {} };
    return JSON.parse(storedState);
  } catch (err) {
    return { results: {} };
  }
};

const saveState = (state: SearchState) => {
  try {
    const storeState = JSON.stringify(state);
    localStorage.setItem("searchResults", storeState);
  } catch (err) {
    console.error("write error occured");
  }
};

const initialState: SearchState = loadState();

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchResults: (
      state,
      action: PayloadAction<{ [key: string]: coinType }>
    ) => {
      state.results = { ...state.results, ...action.payload };
      console.log(state.results);
      saveState(state);
    },
    clearSearchResults: (state) => {
      state.results = {};
      saveState(state);
    },
  },
});

export const { searchResults, clearSearchResults } = searchSlice.actions;
export default searchSlice.reducer;
