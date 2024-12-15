import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice"; // userSlice 경로 확인

export const store = configureStore({
  reducer: {
    user: userSlice, // userSlice를 reducer로 추가
  },
});

export default store;
