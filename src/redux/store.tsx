import { configureStore } from "@reduxjs/toolkit";
import patient from "./patient";

export const store = configureStore({
  reducer: { patient }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
