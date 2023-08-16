import React, { useRef } from "react";
import { useSelector } from "react-redux";

import Togglable from "./Togglable";
import BlogForm from "./BlogForm";

import ListGroup from "react-bootstrap/ListGroup";
//import { LinkContainer } from "react-router-bootstrap";
import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);
  const blogFormRef = useRef();

  return (
    <>
      <Row>
        <h2>blogs</h2>
        <ListGroup>
          {[...blogs]
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <ListGroup.Item key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title} {blog.author}
                </Link>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </Row>
      <Row>
        <Togglable showButton="create" hideButton="cancel" ref={blogFormRef}>
          <BlogForm />
        </Togglable>
      </Row>
    </>
  );
};

export default BlogList;
