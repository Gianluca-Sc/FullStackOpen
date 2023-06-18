import React from "react";

const Notification = ({ message, isMessageError }) => {
  return (
    <div
      className={`alert ${isMessageError ? "alert-danger" : "alert-success"}`}
    >
      {message}
    </div>
  );
};

export default Notification;
