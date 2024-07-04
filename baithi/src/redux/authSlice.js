import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "user",
  initialState: {
    account: {
      access_token: "",
      refresh_token: "",
      username: "",
      role: "",
      email: "",
      image: "",
    },
    isAuthenticated: false,
  },
  reducers: {
    updateUser: (state, action) => {
      state.account = {
        access_token: action?.payload?.DT?.access_token,
        refresh_token: action?.payload?.DT?.refresh_token,
        username: action?.payload?.DT?.username,
        image: action?.payload?.DT?.image,
        role: action?.payload?.DT?.role,
        email: action?.payload?.DT?.email,
      };
      state.isAuthenticated = true;
    },
    logout: (state) => {
        state.account = {
            access_token: '',
            refresh_token:'' ,
            username: '',
            image: '',
            role:'' ,
            email: '',
          };
          state.isAuthenticated = false;
    },
  },
});
export const { updateUser, logout } = authSlice.actions;
export default authSlice.reducer;
