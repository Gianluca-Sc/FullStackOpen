import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { removeBlog, updateExistingBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { Button, Form, ListGroup } from "react-bootstrap";

const Blog = () => {
  const [comment, setComment] = useState("");
  const blogs = useSelector((state) => state.blogs);
  const id = useParams().id;
  const blog = blogs.find((blog) => blog.id === id);
  const user = useSelector((state) => state.user);

  const showRemoveBtn = user.username === blog.user.username;
  console.log(user.username === blog.user.username);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteBlog = async (blogToDelete) => {
    try {
      if (
        window.confirm(
          `Remove blog ${blogToDelete.title} by ${blogToDelete.author}`
        )
      ) {
        dispatch(removeBlog(blogToDelete.id));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      dispatch(setNotification("something went wrong", true));
    }
  };

  const addLikes = () => {
    try {
      dispatch(updateExistingBlog({ ...blog, likes: blog.likes + 1 }));
    } catch (error) {
      console.log(error);
      dispatch(setNotification("something went wrong", true));
    }
  };

  const addComment = (e) => {
    e.preventDefault();
    try {
      dispatch(
        updateExistingBlog({
          ...blog,
          comments: [...blog.comments, comment],
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(setNotification("something went wrong", true));
    }
  };
  return (
    <div className="mt-2">
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>

      <p>
        {blog.likes} likes{" "}
        <Button className="btn-info" onClick={() => addLikes(blog)}>
          like
        </Button>
      </p>
      <p>added by {blog.user.name || blog.user.username}</p>
      {showRemoveBtn && (
        <Button className="btn-danger" onClick={() => deleteBlog(blog)}>
          Remove
        </Button>
      )}
      <div className="mt-5">
        <h3>comments</h3>
        <Form className="d-flex align-content-start" onSubmit={addComment}>
          <Form.Control
            className="mx-2"
            type="text"
            name="comment"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <Button type="submit" className="btn-success">
            add comment
          </Button>
        </Form>

        <ListGroup as="ol" className="mt-2" numbered variant="flush">
          {blog.comments &&
            blog.comments.map((comment) => {
              return (
                <ListGroup.Item key={Math.floor(Math.random() * 1000)}>
                  {comment}
                </ListGroup.Item>
              );
            })}
        </ListGroup>
      </div>
    </div>
  );
};

export default Blog;
