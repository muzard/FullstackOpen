const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./helper");
const app = require("../app");
const Blog = require("../models/blog");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

describe("api tests", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("returns the right amount of blogs", async () => {
    const blogs = await helper.blogsInDb();

    expect(blogs.length).toBe(helper.initialBlogs.length);
  });

  test("identifier exists and is id, not _id", async () => {
    const blogs = await Blog.find({});
    const testBlog = blogs[0];

    expect(testBlog.id).toBeDefined();
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
