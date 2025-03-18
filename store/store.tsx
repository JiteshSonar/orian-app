import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import globalStateReducer from "./auth/globalStateSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    globalState : globalStateReducer
  },
});

export type RootState = ReturnType<typeof store.getState>; // ✅ Define RootState type
export type AppDispatch = typeof store.dispatch; // ✅ Define AppDispatch type

export default store;
