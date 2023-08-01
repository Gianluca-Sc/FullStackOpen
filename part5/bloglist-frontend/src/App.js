import { useState, useEffect, useRef } from "react";
import "./app.css";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({
    error: false,
    message: "",
  });

  const blogFormRef = useRef();

  const fetchData = async () => {
    const blogs = await blogService.getAll();
    setBlogs(blogs);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("user");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const clearNotification = () => {
    setNotification({ error: false, message: "" });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("user", JSON.stringify(user));

      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log(error);
      setNotification({ error: true, message: "Wrong Credentials" });
      setTimeout(() => {
        clearNotification();
      }, 5000);
    }
  };

  const handleLogut = () => {
    window.localStorage.removeItem("user");
    setUser(null);
  };

  const createBlog = async ({ title, author, url }) => {
    try {
      blogFormRef.current.toggleVisibility();
      await blogService.create({ title, author, url });
      fetchData();

      const message = `a new blog ${title} ${author && `by ${author}`} added`;
      setNotification({
        error: false,
        message,
      });
      setTimeout(() => {
        clearNotification();
      }, 5000);
    } catch (error) {
      console.log(error);
      setNotification({ error: true, message: "something went wrong" });
      setTimeout(() => {
        clearNotification();
      }, 5000);
    }
  };

  const updateBlog = async (blogTopdate) => {
    try {
      blogTopdate.likes += 1;
      await blogService.updateLikes(blogTopdate);
      fetchData();
    } catch (error) {
      console.log(error);
      setNotification({ error: true, message: "something went wrong" });
      setTimeout(() => {
        clearNotification();
      }, 5000);
    }
  };

  const deleteBlog = async (blogToDelete) => {
    try {
      if (
        window.confirm(
          `Remove blog ${blogToDelete.title} by ${blogToDelete.author}`
        )
      ) {
        await blogService.deleteBlog(blogToDelete.id);
        setBlogs(blogs.filter((blog) => blog.id !== blogToDelete.id));
      }
    } catch (error) {
      console.log(error);
      setNotification({ error: true, message: "something went wrong" });
      setTimeout(() => {
        clearNotification();
      }, 5000);
    }
  };

  return (
    <div>
      <h2>blogs</h2>
      {notification.message && <Notification notification={notification} />}
      {user === null ? (
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      ) : (
        <div>
          <p>
            {user.name || user.username} logged in{" "}
            <button onClick={handleLogut}>logout</button>
          </p>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                updateBlog={updateBlog}
                deleteBlog={deleteBlog}
                user={user}
              />
            ))}
          <Togglable showButton="create" hideButton="cancel" ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>
        </div>
      )}
    </div>
  );
};

export default App;
