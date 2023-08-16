import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
  name: "notification",
  initialState: { message: "", error: false },
  reducers: {
    addNotification: (state, action) => {
      return { message: action.payload.message, error: action.payload.error };
    },
    removeNotification: () => {
      return { message: "", error: false };
    },
  },
});

export const setNotification = (message, error, seconds = 5000) => {
  return (dispatch) => {
    dispatch(addNotification({ message, error }));
    setTimeout(() => {
      dispatch(removeNotification());
    }, seconds);
  };
};

export const { addNotification, removeNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
