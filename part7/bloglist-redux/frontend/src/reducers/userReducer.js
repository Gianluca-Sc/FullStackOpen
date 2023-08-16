import { createSlice } from "@reduxjs/toolkit";

import loginService from "../services/login";

export const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
    removeUser: () => {
      return null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export const login = ({ username, password }) => {
  return async (dispatch) => {
    const user = await loginService.login({ username, password });
    window.localStorage.setItem("user", JSON.stringify(user));
    dispatch(setUser(user));
  };
};

export default userSlice.reducer;
