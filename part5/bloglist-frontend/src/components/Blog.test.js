import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("Blog test", () => {
  let container;
  const username = "Tester";
  const blog = {
    title: "Test title ",
    author: "Test author ",
    url: "www.test.org",
    likes: 1,
    user: { username },
  };
  const mockUpdateblog = jest.fn();

  beforeEach(() => {
    container = render(
      <Blog blog={blog} user={{ username }} updateBlog={mockUpdateblog} />
    ).container;
  });

  test("Title and author are shown by default", () => {
    const titleElement = screen.findByText("Test Title");
    expect(titleElement).toBeDefined();

    const authorElement = screen.findByText("Test Author");
    expect(authorElement).toBeDefined();
  });

  test("URL and likes are hidden by default", () => {
    const div = container.querySelector(".blog");
    expect(div).not.toHaveTextContent("www.test.org");
  });

  test("Url and likes are shown after clicking view", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);
    const div = container.querySelector(".blog-details");
    expect(div).toHaveTextContent("www.test.org");
    expect(div).toHaveTextContent(`likes: ${blog.likes}`);
  });

  test("like button clicked twice", async () => {
    const user = userEvent.setup();
    const viewButton = screen.getByText("view");
    await user.click(viewButton);
    const likeButton = screen.getByText("like");
    await user.click(likeButton);
    await user.click(likeButton);
    expect(mockUpdateblog.mock.calls).toHaveLength(2);
  });
});
