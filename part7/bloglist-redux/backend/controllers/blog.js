const BlogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const middleware = require("..//utils/middleware");

BlogRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  blogs ? res.json(blogs) : res.status(404).end();
});

BlogRouter.post("/", middleware.userExtractor, async (req, res) => {
  const user = await User.findById(req.user.id);
  const blog = new Blog(req.body);

  if (!user.id) {
    return response.status(401).json({ error: "invalid user" });
  }

  if (!blog.title || !blog.url) return res.status(400).end();

  blog.user = user.id;
  const savedBlog = await blog.save();

  user.blogs = [...user.blogs, savedBlog.id];
  await user.save();

  res.status(201).json(savedBlog);
});

BlogRouter.delete("/:id", middleware.userExtractor, async (req, res) => {
  const { id } = req.params;

  const user = req.user;
  const blog = await Blog.findById(id).populate("user");

  if (!blog) return res.status(404).json({ error: "blog not found" });

  if (!user.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  if (blog.user.id.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(id);
    return res.status(204).end();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

BlogRouter.put("/:id", async (req, res) => {
  const { id } = req.params;

  const { title, author, url, likes, comments } = req.body;

  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    { title, author, url, likes, comments },
    { new: true }
  );

  if (!updatedBlog) return res.status(404).json({ error: "Blog not found" });
  res.status(200).json(updatedBlog);
});

module.exports = BlogRouter;
