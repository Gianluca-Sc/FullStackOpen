import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const clearNewBlogInputs = () => {
    setTitle("");
    setAuthor("");
    setUrl("");
  };
  const addBlog = (e) => {
    e.preventDefault();
    createBlog({ title, author, url });
    clearNewBlogInputs();
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          <label htmlFor="title">title: </label>
          <input
            type="text"
            placeholder="Enter title"
            name="title"
            id="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </div>
        <div>
          <label htmlFor="author">author: </label>
          <input
            type="text"
            placeholder="Enter author"
            name="author"
            id="author"
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
          />
        </div>
        <div>
          <label htmlFor="url">url: </label>
          <input
            type="text"
            placeholder="Enter url"
            name="url"
            id="url"
            onChange={(e) => setUrl(e.target.value)}
            value={url}
            required
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default BlogForm;
