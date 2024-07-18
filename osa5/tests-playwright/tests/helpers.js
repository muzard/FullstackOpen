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

const login = async (page, username = "testaaja", password = "salainen") => {
  await page.getByTestId("username").fill(username);
  await page.getByTestId("password").fill(password);

  await page.getByRole("button", { name: "login" }).click();
};

module.exports = { createBlog, likeManyTimes, login };
