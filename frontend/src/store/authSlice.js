// authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  user: null,
  role: null,
  token: Cookies.get("token") || null,
};


export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.user = null;
      state.role = null;
      state.token = null;
    },
    loginSuccess: (state, action) => {
      const { user, token, role } = action.payload;
      state.user = user;
      state.token = token;
      state.role = role;
      // Set cookie
      Cookies.set("token", token, { expires: 7, secure: true, sameSite: "Strict" });
    },
    logout: (state) => {
      state.user = null;
      state.role = null;
      state.token = null;
      // Clear cookie
      Cookies.remove("token");
    },
  },
});

// Export actions
export const { loginStart, loginSuccess, logout } = authSlice.actions;

// Export reducer
export default authSlice.reducer;

