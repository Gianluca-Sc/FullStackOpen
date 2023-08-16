import React, { useState } from "react";

import { useDispatch } from "react-redux";
import loginService from "../services/login";
import { setUser } from "../reducers/userReducer";
import { setNotification } from "../reducers/notificationReducer";
import { Button, Form, Row } from "react-bootstrap";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("user", JSON.stringify(user));
      dispatch(setUser(user));
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log(error);
      dispatch(setNotification("Wrong Credentials", true));
    }
  };
  return (
    <Row>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label htmlFor="username">username: </Form.Label>
          <Form.Control
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="password">password: </Form.Label>
          <Form.Control
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button id="login-button" type="submit" className="mt-2">
          login
        </Button>
      </Form>
    </Row>
  );
};

export default LoginForm;
