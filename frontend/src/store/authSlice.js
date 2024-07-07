import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  role: localStorage.getItem("role") || null,
  token: localStorage.getItem("token") || null
};

const isTokenExpired = (token) => {
  if (!token) return true;

  const expiryDate = (JSON.parse(atob(token.split('.')[1]))).exp * 1000;
  return Date.now() > expiryDate;
};
if (isTokenExpired(localStorage.getItem("token"))) {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("role");
}
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
      // Set items in localStorage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
    },
    logout: (state) => {
      state.user = null;
      state.role = null;
      state.token = null;
      // Clear localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    }
  }
});

// Export actions
export const { loginStart, loginSuccess, logout } = authSlice.actions;

// Export reducer
export default authSlice.reducer;