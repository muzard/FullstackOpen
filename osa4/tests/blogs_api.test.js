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

  test("when likes are not given, they are automatically 0", async () => {
    const newBlog = {
      title: "new blog",
      author: "new author",
      url: "fullstackopen.com",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const returnedBlog = await Blog.findOne({ title: "new blog" });
    expect(returnedBlog.likes).toBeDefined();
    expect(returnedBlog.likes).toBe(0);
  });

  test("when no title or url are given, it's handled as a bad request", async () => {
    const newBlog = {
      author: "new author",
      likes: 13,
    };

    await api.post("/api/blogs").send(newBlog).expect(400);
  });

  test("url not given, is bad request", async () => {
    const newBlog = {
      title: "new blog",
      author: "new author",
      likes: 13,
    };

    await api.post("/api/blogs").send(newBlog).expect(400);
  });

  test("no title given, is bad request", async () => {
    const newBlog = {
      author: "new author",
      url: "fullstackopen.com",
      likes: 13,
    };

    await api.post("/api/blogs").send(newBlog).expect(400);
  });
});

describe("tests regarding one id", () => {
  test("deletion works with valid id", async () => {
    const blogs = await Blog.find({});
    const deletedBlog = blogs[0];

    await api.delete(`/api/blogs/${deletedBlog.id}`).expect(204);

    const newBlogs = await Blog.find({});
    const titles = newBlogs.map((b) => b.title);

    expect(newBlogs).toHaveLength(helper.initialBlogs.length - 1);
    expect(titles).not.toContainEqual(deletedBlog.title);
  });

  /* test.only("deletion fails with 404 with valid but unfound id", async () => {
    const id = await helper.nonExistingId();

    await api.delete(`/api/blogs/${id}`).expect(404);
  });

  test("deletion fails with 400 with invalid id", async () => {
    const id = "aaa";

    await api.delete(`/api/blogs/${id}`).expect(400);
  }); */
});

describe.only("updating a blog", () => {
  test("works with full new blog", async () => {
    const blog = {
      title: "updated",
      author: "updated",
      url: "updated.com",
      likes: 123,
    };

    const oldBlog = await Blog.findOne({});

    await api.put(`/api/blogs/${oldBlog.id}`).send(blog).expect(204);

    const blogs = await Blog.find({});
    const titles = blogs.map((b) => b.title);

    expect(blogs).toHaveLength(helper.initialBlogs.length);
    expect(titles).toContainEqual(blog.title);
    expect(titles).not.toContainEqual(oldBlog.title);
  });

  test("works with partial blog", async () => {
    const blog = {
      likes: 123,
    };

    const oldBlog = await Blog.findOne({});

    await api.put(`/api/blogs/${oldBlog.id}`).send(blog).expect(204);

    const updatedBlog = await Blog.findById(oldBlog.id);

    expect(updatedBlog.likes).toBe(blog.likes);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
