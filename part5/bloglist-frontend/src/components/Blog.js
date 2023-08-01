import { useState } from "react";

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const [showDetail, setShowDetail] = useState(false);
  const showRemoveBtn = user.username === blog.user.username;

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <div style={blogStyle} className="blog">
      {blog.title} {blog.author}{" "}
      <button onClick={() => setShowDetail(!showDetail)}>
        {showDetail ? "hide" : "view"}
      </button>
      {showDetail && (
        <div className="blog-details">
          <a href={blog.url}>{blog.url}</a>
          <p>
            likes: {blog.likes}{" "}
            <button className="like-btn" onClick={() => updateBlog(blog)}>
              like
            </button>
          </p>
          <p>{blog.user.username}</p>
          {showRemoveBtn && (
            <button onClick={() => deleteBlog(blog)}>Remove</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
