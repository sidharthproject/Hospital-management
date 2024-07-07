import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  role: null,
  token: null
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.user = null;
      state.role = null;
      state.token =  Cookies.get("token") || null,
    },
    loginSuccess: (state, action) => {
      const { user, token, role } = action.payload;
      state.user = user;
      state.token = token;
      state.role = role;
    },
    logout: (state) => {
      state.user = null;
      state.role = null;
      state.token = null;
    }
  }
});

// Export actions
export const { loginStart, loginSuccess, logout } = authSlice.actions;

// Export reducer
export default authSlice.reducer;

