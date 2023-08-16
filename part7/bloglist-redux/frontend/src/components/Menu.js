import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../reducers/userReducer";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";

const Menu = () => {
  const dispatch = useDispatch();
  const handleLogut = () => {
    window.localStorage.removeItem("user");
    dispatch(removeUser());
  };
  const user = useSelector((state) => state.user);
  return (
    <Navbar className="justify-content-between align-items-center">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to={"/"}>
              <Nav.Link>blogs</Nav.Link>
            </LinkContainer>
            <LinkContainer to={"/users"}>
              <Nav.Link>users</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
        <div>
          {user.name || user.username} logged in{" "}
          <Button onClick={handleLogut}>logout</Button>
        </div>
      </Container>
    </Navbar>
  );
};

export default Menu;
