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

module.exports = blogsRouter;
