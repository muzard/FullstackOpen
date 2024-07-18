const { test, expect, beforeEach, describe } = require("@playwright/test");
const { before } = require("node:test");

const createBlog = async (page) => {
  await page.getByRole("button", { name: "new blog" }).click();
  await page.getByTestId("title").fill("test title");
  await page.getByTestId("author").fill("testblog author");
  await page.getByTestId("url").fill("www.nonexistenturl.fi");
  await page.getByRole("button", { name: "create" }).click();
};

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http:/localhost:3001/api/testing/reset");
    await request.post("http://localhost:3001/api/users", {
      data: {
        username: "testaaja",
        name: "testaaja",
        password: "salainen",
      },
    });

    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    const usernameDiv = await page.getByText("username");
    const passwordDiv = await page.getByText("password");

    await expect(usernameDiv).toBeVisible();
    await expect(passwordDiv).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await page.getByTestId("username").fill("testaaja");
      await page.getByTestId("password").fill("salainen");

      await page.getByRole("button", { name: "login" }).click();

      await expect(page.getByText("testaaja logged in")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await page.getByTestId("username").fill("wrong");
      await page.getByTestId("password").fill("creds");
      await page.getByRole("button", { name: "login" }).click();

      await expect(page.getByText("login failed")).toBeVisible();
    });
  });

  describe("When logged in", async () => {
    beforeEach(async ({ page }) => {
      await page.getByTestId("username").fill("testaaja");
      await page.getByTestId("password").fill("salainen");

      await page.getByRole("button", { name: "login" }).click();
    });

    test("a new blog can be created", async ({ page }) => {
      await createBlog(page);

      await expect(
        page.getByText("test title by testblog authorview")
      ).toBeVisible();
      await expect(
        page.getByText("test title by testblog authorhide")
      ).not.toBeVisible();
    });

    test("blog can be liked", async ({ page }) => {
      await createBlog(page);

      await page.getByRole("button", { name: "view" }).click();
      await page.getByRole("button", { name: "like" }).click();

      await expect(page.getByText("1 like")).toBeVisible();
    });

    test("blog can be removed", async ({ page }) => {
      await createBlog(page);

      await page.getByRole("button", { name: "view" }).click();
      await page.on("dialog", (dialog) => dialog.accept());
      const removeButton = await page.getByRole("button", { name: "remove" });
      expect(removeButton).toBeVisible();
      await removeButton.click();

      await expect(
        page.getByText("test title by testblog authorview")
      ).not.toBeVisible();

      await expect(
        page.getByText("test title by testblog authorhide")
      ).not.toBeVisible();
    });

    // test "blog can be removed" makes sure that it is visible to the creator
    test("remove button is only visible to the creator of the blog", async ({
      page,
      request,
    }) => {
      await createBlog(page);

      await page.getByRole("button", { name: "log out" }).click();

      // create second test account
      await request.post("http://localhost:3001/api/users", {
        data: {
          username: "testaaja2",
          name: "testaaja2",
          password: "salainen2",
        },
      });

      await page.getByTestId("username").fill("testaaja2");
      await page.getByTestId("password").fill("salainen2");
      await page.getByRole("button", { name: "login" }).click();
      await page.getByRole("button", { name: "view" }).click();
      await page.pause();
      await expect(page.getByRole("button", { name: "remove" })).toBeHidden();
    });
  });
});
