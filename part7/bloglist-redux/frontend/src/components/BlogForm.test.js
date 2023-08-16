import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

describe("Test BlogForm", () => {
  const newBlog = {
    title: "New blog title",
    author: "New blog author",
    url: "www.newblog.org",
  };
  const createBlog = jest.fn();
  test("check create blog", async () => {
    render(<BlogForm createBlog={createBlog} />);
    const titleInput = screen.getByPlaceholderText("Enter title");
    const authorInput = screen.getByPlaceholderText("Enter author");
    const urlInput = screen.getByPlaceholderText("Enter url");

    const user = userEvent.setup();
    const createButton = screen.getByText("create");

    await user.type(titleInput, newBlog.title);
    await user.type(authorInput, newBlog.author);
    await user.type(urlInput, newBlog.url);

    await user.click(createButton);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0]).toEqual(newBlog);
  });
});
