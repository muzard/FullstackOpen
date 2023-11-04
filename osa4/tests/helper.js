const Blog = require("../models/blog");

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
    likes: 404,
  });

  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
};
