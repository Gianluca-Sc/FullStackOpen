import { /* useState, */ useEffect } from "react";
import "./app.css";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
//import loginService from "./services/login";

import LoginForm from "./components/LoginForm";

import { useDispatch, useSelector } from "react-redux";
//import { setNotification } from "./reducers/notificationReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import { setUser } from "./reducers/userReducer";
import { Route, Routes, useMatch } from "react-router-dom";
import Users from "./components/Users";
import User from "./components/User";
import { initializeUsers } from "./reducers/usersReducer";
import BlogList from "./components/BlogList";
import Blog from "./components/Blog";
import Menu from "./components/Menu";

const App = () => {
  const notification = useSelector((state) => state.notification);
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("user");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  const match = useMatch("/users/:id");
  const userMatched = match
    ? users.find((user) => user.id === match.params.id)
    : null;

  if (!user) {
    return (
      <div>
        <h2>blogs</h2>
        {notification.message && <Notification />}
        <LoginForm />
      </div>
    );
  }

  return (
    <>
      <Menu />

      {notification.message && <Notification />}

      <Routes>
        <Route path="/" element={<BlogList user={user} />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User user={userMatched} />} />
        <Route path="/blogs/:id" element={<Blog />} />
      </Routes>
    </>
  );
};

export default App;
