import { createSlice } from "@reduxjs/toolkit";

import userService from "../services/users";

export const usersSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUsers: (state, action) => {
      return action.payload;
    },
    removeUsers: () => {
      return null;
    },
  },
});

export const { setUsers, removeUsers } = usersSlice.actions;

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch(setUsers(users));
  };
};

export default usersSlice.reducer;
