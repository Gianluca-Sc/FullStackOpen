import { useState } from "react";
import { useDispatch } from "react-redux";
import { addBlog } from "../reducers/blogReducer";
import { Button, Form } from "react-bootstrap";

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const dispatch = useDispatch();

  const clearNewBlogInputs = () => {
    setTitle("");
    setAuthor("");
    setUrl("");
  };
  const createBlog = (e) => {
    e.preventDefault();

    const newBlog = { title, author, url };
    dispatch(addBlog(newBlog));
    clearNewBlogInputs();
  };

  return (
    <div>
      <h2>create new</h2>
      <Form onSubmit={createBlog}>
        <Form.Group>
          <Form.Label htmlFor="title">title: </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            name="title"
            id="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="author">author: </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter author"
            name="author"
            id="author"
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="url">url: </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter url"
            name="url"
            id="url"
            onChange={(e) => setUrl(e.target.value)}
            value={url}
            required
          />
        </Form.Group>
        <Button className="mt-2 btn-success" type="submit">
          Save
        </Button>
      </Form>
    </div>
  );
};

export default BlogForm;
