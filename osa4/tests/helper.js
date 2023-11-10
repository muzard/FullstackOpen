const Blog = require("../models/blog");
const User = require("../models/user");

const initialUsers = [
  {
    username: "testaaja",
    name: "testaaja",
    blogs: [
      {
        title: "last blog",
        author: "same author",
        url: "fullstackopen.com",
        likes: 1337,
        id: "654e4ade17aeb499108d8abd",
      },
      {
        title: "last blog",
        author: "same author",
        url: "fullstackopen.com",
        likes: 1337,
        id: "654e4b2d300f2b33198051e7",
      },
    ],
    id: "654e49b98e5d68970626b31c",
  },
];

const initialBlogs = [
  {
    title: "last blog",
    author: "same author",
    url: "fullstackopen.com",
    likes: 1337,
    user: {
      username: "testaaja",
      name: "testaaja",
      id: "654e49b98e5d68970626b31c",
    },
    id: "654e4ade17aeb499108d8abd",
  },
  {
    title: "last blog",
    author: "same author",
    url: "fullstackopen.com",
    likes: 1337,
    user: {
      username: "testaaja",
      name: "testaaja",
      id: "654e49b98e5d68970626b31c",
    },
    id: "654e4b2d300f2b33198051e7",
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
  nonExistingId,
  blogsInDb,
  usersInDb,
  initialBlogs,
  initialUsers,
};
