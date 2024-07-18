const { test, expect, beforeEach, describe } = require("@playwright/test");

const createBlog = async (
  page,
  title = "test title",
  author = "testblog author",
  url = "www.nonexistenturl.fi"
) => {
  await page.getByRole("button", { name: "new blog" }).click();
  await page.getByTestId("title").fill(title);
  await page.getByTestId("author").fill(author);
  await page.getByTestId("url").fill(url);
  await page.getByRole("button", { name: "create" }).click();
};

const likeManyTimes = async (likeButton, n) => {
  for (let i = 0; i < n; i++) {
    await likeButton.click();
  }
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
    test("blogs are sorted by the number of likes", async ({ page }) => {
      await createBlog(page);
      await page.getByRole("button", { name: "view" }).click();
      let likeButton = await page.getByRole("button", { name: "like" });
      let likes = 5;

      await likeManyTimes(likeButton, likes);
      await expect(page.getByText(`${likes} like`)).toBeVisible();

      await createBlog(page, "most likes", "likeable", "www.likedin.com");
      await page
        .getByText("most likes by likeableview")
        .getByRole("button", { name: "view" })
        .click();

      likeButton = await page
        .getByText("most likes by likeablehidewww")
        .getByRole("button", { name: "like" });
      await likeManyTimes(likeButton, 15);
      await expect(page.getByText("15 like")).toBeVisible();

      await createBlog(page, "least liked", "unlikeable", "boringurl.fi");
      await page
        .getByText("least liked by unlikeableview")
        .getByRole("button", { name: "view" })
        .click();

      likeButton = await page
        .getByText(
          "least liked by unlikeablehideboringurl.fi0 liketestaajaremove"
        )
        .getByRole("button", { name: "like" });
      await likeManyTimes(likeButton, 1);
      await expect(page.getByText("1 like")).toBeVisible();

      await page.reload();

      await page
        .getByText("least liked by unlikeableview")
        .getByRole("button", { name: "view" })
        .click();
      await page
        .getByText("most likes by likeableview")
        .getByRole("button", { name: "view" })
        .click();
      await page
        .getByText("test title by testblog authorview")
        .getByRole("button", { name: "view" })
        .click();

      await page.pause();

      await expect(
        page.locator(".hiddenAtFirst").first().getByText("15 like")
      ).toBeVisible();
      await expect(
        page.locator(".hiddenAtFirst").last().getByText("1 like")
      ).toBeVisible();
    });
  });
});
