import { Alert } from "react-bootstrap";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const { error, message } = notification;
  return (
    <Alert variant={error ? "danger" : "success"}>
      <h4>{message}</h4>
    </Alert>
  );
};

export default Notification;
