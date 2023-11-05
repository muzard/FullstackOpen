const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const { info, error } = require("../utils/logger");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  info(request.title);
  const { title, author, url, likes } = request.body;
  if (!title || !url) {
    response.status(400).end();
    return null;
  }

  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes || 0,
  });

  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;
  const oldBlog = await Blog.findById(request.params.id);

  const newBlog = {
    title: body.title || oldBlog.title,
    author: body.author || oldBlog.author,
    url: body.url || oldBlog.url,
    likes: body.likes || oldBlog.likes,
  };

  const updatedNote = await Blog.findByIdAndUpdate(request.params.id, newBlog, {
    new: true,
  });

  response.status(204).json(updatedNote);
});

module.exports = blogsRouter;
