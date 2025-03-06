import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice"; // Ensure correct path

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>; // ✅ Define RootState type
export type AppDispatch = typeof store.dispatch; // ✅ Define AppDispatch type

export default store;
