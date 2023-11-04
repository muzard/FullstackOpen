const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

describe("api tests", () => {
  test("notes are returned as json", async () => {
    await api
      .get("/api/notes")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("there are two notes", async () => {
    const response = await api.get("/api/notes");

    expect(response.body).toHaveLength(2);
  });

  test("the first note is about this part", async () => {
    const response = await api.get("/api/notes");

    expect(response.body[0].content).toBe("This part of the course is funked");
  });

  test("the second note is important", async () => {
    const response = await api.get("/api/notes");

    expect(response.body[1].important).toBe(true);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
