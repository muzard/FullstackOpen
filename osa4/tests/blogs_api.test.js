const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./helper");
const app = require("../app");
const Blog = require("../models/blog");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const api = supertest(app);

let blogCount = 2;

const legitToken =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RhYWphIiwiaWQiOiI2NTRlNDliOThlNWQ2ODk3MDYyNmIzMWMiLCJpYXQiOjE2OTk2Mjk1MTQsImV4cCI6MTY5OTYzMzExNH0._xK8Mi-ThQa-DtHcfi9H9hZoW7uxGHF89kW32mniHFk";

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
      author: "same author",
      url: "fullstackopen.com",
      likes: 1,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", legitToken)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");
    const titles = response.body.map((r) => r.title);

    expect(response.body).toHaveLength(blogCount + 1);
    expect(titles).toContain("new blog");
  });

  test("when likes are not given, they are automatically 0", async () => {
    const newBlog = {
      title: "new blog 2",
      author: "new author",
      url: "fullstackopen.com",
    };

    await api
      .post("/api/blogs")
      .set("Authorization", legitToken)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const returnedBlog = await Blog.findOne({ title: "new blog 2" });
    expect(returnedBlog.likes).toBeDefined();
    expect(returnedBlog.likes).toBe(0);
  });

  test("when no title or url are given, it's handled as a bad request", async () => {
    const newBlog = {
      author: "new author",
      likes: 13,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", legitToken)
      .send(newBlog)
      .expect(400);
  });

  test("url not given, is bad request", async () => {
    const newBlog = {
      title: "new blog",
      author: "new author",
      likes: 13,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", legitToken)
      .send(newBlog)
      .expect(400);
  });

  test("no title given, is bad request", async () => {
    const newBlog = {
      author: "new author",
      url: "fullstackopen.com",
      likes: 13,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", legitToken)
      .send(newBlog)
      .expect(400);
  });
});

describe("tests regarding one id", () => {
  test("deletion works with valid id", async () => {
    const blogs = await Blog.find({});
    const deletedBlog = blogs[0];

    await api
      .delete(`/api/blogs/${deletedBlog.id}`)
      .set("Authorization", legitToken)
      .expect(204);

    const newBlogs = await Blog.find({});
    const titles = newBlogs.map((b) => b.title);

    expect(newBlogs).toHaveLength(5 - 1);
    expect(titles).not.toContainEqual(deletedBlog.title);
  });

  /* test("deletion fails with 404 with valid but unfound id", async () => {
    const id = await helper.nonExistingId();

    await api.delete(`/api/blogs/${id}`).expect(404);
  });

  test("deletion fails with 400 with invalid id", async () => {
    const id = "aaa";

    await api.delete(`/api/blogs/${id}`).expect(400);
  }); */
});

describe("updating a blog", () => {
  test("works with full new blog", async () => {
    const blog = {
      title: "updated1111",
      author: "updated",
      url: "updated.com",
      likes: 123,
    };

    const oldBlog = await Blog.findOne({});

    await api.put(`/api/blogs/${oldBlog.id}`).send(blog).expect(204);

    const blogs = await Blog.find({});
    const titles = blogs.map((b) => b.title);

    expect(blogs).toHaveLength(4);
    expect(titles).toContainEqual(blog.title);
    expect(titles).not.toContainEqual(oldBlog.title);
  });

  test.only("works with partial blog", async () => {
    const blog = {
      likes: 123,
    };

    const oldBlog = await Blog.findOne({});

    await api.put(`/api/blogs/${oldBlog.id}`).send(blog).expect(204);

    const updatedBlog = await Blog.findById(oldBlog.id);

    expect(updatedBlog.likes).toBe(blog.likes);
  });
});

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const user = { username: "root", name: "juuri", password: "salainen" };
    await api.post("/api/users").send(user);
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "testaaja",
      name: "ikmititrtsiw",
      password: "salasana",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContainEqual(newUser.username);
  });

  test("creation fails with proper statuscode if username is taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "ikmititrtsiw",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test("creation fails with proper code and message with invalid username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "t",
      name: "ikmititrtsiw",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test.only("creation fails with proper code and message with missing password", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root34",
      name: "Superuser",
    };

    // problems under this

    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
