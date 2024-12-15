import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: localStorage.getItem("accessToken") ? true : false, // accessToken이 있으면 로그인 상태
  token: localStorage.getItem("accessToken") || null, // accessToken 가져오기
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.isLoggedIn = true;
      // token과 user를 localStorage에 저장
      localStorage.setItem("accessToken", action.payload.token);
    },
    logout: (state) => {
      state.isLoggedIn = false;

      state.token = null;
      // localStorage에서 token과 user 삭제
      localStorage.removeItem("accessToken");
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
