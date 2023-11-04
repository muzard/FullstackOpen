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

  test("valid blogs can be added", async () => {
    const newBlog = {
      title: "new blog",
      author: "new author",
      url: "fullstackopen.com",
      likes: 1,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");
    const titles = response.body.map((r) => r.title);

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
    expect(titles).toContain("new blog");
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
