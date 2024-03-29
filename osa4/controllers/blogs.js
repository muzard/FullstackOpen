const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const { info, error } = require("../utils/logger");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "invalid token" });
  }
  const user = request.user;
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
    user: user.id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id.toString());
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  console.log("------");
  console.log(request.user);
  console.log("------");

  const blog = await Blog.findById(request.params.id);
  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!decodedToken) {
    return response.status(401).json({ error: "invalid token" });
  }

  const user = request.user;

  if (blog.user.toString() === decodedToken.id.toString()) {
    await Blog.findByIdAndRemove(blog.id);

    user.blogs = user.blogs.filter((blog) => {
      return blog.toString() !== request.params.id;
    });

    await user.save();

    response.status(204).end();
  } else {
    return response.status(403).json({ error: "no permission" });
  }
});

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;
  const oldBlog = await Blog.findById(request.params.id);

  const newBlog = {
    title: body.title || oldBlog.title,
    author: body.author || oldBlog.author,
    url: body.url || oldBlog.url,
    likes: body.likes || oldBlog.likes,
    user: oldBlog.user,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, {
    new: true,
  });

  response.status(204).json(updatedBlog);
});

module.exports = blogsRouter;
