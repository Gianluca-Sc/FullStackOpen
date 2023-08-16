import React from "react";
import { ListGroup } from "react-bootstrap";

const User = ({ user }) => {
  const { name, username, blogs } = user;

  if (!user) {
    return null;
  }
  return (
    <div>
      <h2>{name || username}</h2>
      <h3>added blogs</h3>
      <ListGroup>
        {blogs.map((blog) => {
          return <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>;
        })}
      </ListGroup>
    </div>
  );
};

export default User;
