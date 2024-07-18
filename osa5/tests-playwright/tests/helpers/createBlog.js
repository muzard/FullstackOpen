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

module.exports = createBlog;
