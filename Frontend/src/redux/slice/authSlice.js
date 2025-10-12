// frontend/src/redux/slice/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const userInfo = JSON.parse(localStorage.getItem("vitalbowl_user")) || null;

const initialState = {
  user: userInfo,
  isAuthenticated: !!userInfo,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginAction: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("vitalbowl_user", JSON.stringify(action.payload));
    },
    logoutAction: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("vitalbowl_user");
    },
    updateUserAction: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("vitalbowl_user", JSON.stringify(action.payload));
    },
  },
});

export const { loginAction, logoutAction, updateUserAction } = authSlice.actions;
export default authSlice.reducer;
