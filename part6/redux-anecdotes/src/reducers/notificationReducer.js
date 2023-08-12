import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    showNotification(state, action) {
      return action.payload;
    },
    removeNotification(state, action) {
      return "";
    },
  },
});

export const setNotification = (message, seconds) => {
  return (dispatch) => {
    dispatch(showNotification(message));
    setTimeout(() => {
      dispatch(removeNotification());
    }, seconds);
  };
};

export const { showNotification, removeNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
