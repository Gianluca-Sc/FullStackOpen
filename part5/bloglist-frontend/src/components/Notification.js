const Notification = ({ notification }) => {
  const { error, message } = notification;
  return (
    <div className={error ? "error" : "successful"}>
      <h4>{message}</h4>
    </div>
  );
};

export default Notification;
