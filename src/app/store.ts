import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { coffeeApi } from "./api/api";

export const store = configureStore({
  reducer: {
    [coffeeApi.reducerPath]: coffeeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(coffeeApi.middleware),
});

setupListeners(store.dispatch);
