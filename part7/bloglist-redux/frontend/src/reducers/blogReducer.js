import { createSlice } from "@reduxjs/toolkit";

import blogsService from "../services/blogs";
import { setNotification } from "./notificationReducer";

export const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    createBlog: (state, action) => {
      state.push(action.payload);
    },
    setBlogs: (state, action) => {
      return action.payload;
    },
    addVote: (state, action) => {
      const id = action.payload.id;
      return state.map((blog) => (blog.id === id ? action.payload : blog));
    },
    deleteBlog: (state, action) => {
      const id = action.payload;
      console.log(action.payload);
      return state.filter((blog) => blog.id !== id);
    },
  },
});

export const { createBlog, setBlogs, addVote, deleteBlog } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const addBlog = (newBlog) => {
  return async (dispatch) => {
    try {
      await blogsService.create(newBlog);
      dispatch(initializeBlogs());
      const message = `a new blog ${newBlog.title} ${
        newBlog.author && `by ${newBlog.author}`
      } added`;
      dispatch(setNotification(message, false));
    } catch (error) {
      console.log(error);
      dispatch(setNotification("something went wrong", true));
    }
  };
};

export const updateExistingBlog = (blog) => {
  return async (dispatch) => {
    await blogsService.updateBlog(blog);
    //dispatch(addVote(updatedBlog));
    dispatch(initializeBlogs());
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogsService.deleteBlog(id);
    dispatch(deleteBlog(id));
  };
};

export default blogSlice.reducer;
