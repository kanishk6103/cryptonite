import { configureStore } from "@reduxjs/toolkit";
import coinReducer from "./features/coin/coinSlice";
import searchSlice from "./features/coin/searchSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      coins: coinReducer,
      search: searchSlice,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
