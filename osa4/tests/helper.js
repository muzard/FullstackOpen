const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "first",
    author: "first author",
    url: "google.com",
    likes: 5,
  },
  {
    title: "second",
    author: "second author",
    url: "syk.fi",
    likes: 10,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({
    title: "removable",
    author: "removable",
    url: "facebook.com",
    likes: 404,
  });

  await blog.save();
  await Blog.findOneAndRemove({ title: "removable" });

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
};
