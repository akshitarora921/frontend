import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./store";

export const store = configureStore({
  reducer,
});
