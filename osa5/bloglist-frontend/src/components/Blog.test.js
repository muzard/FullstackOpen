import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

const getByText = (text, isExact = true) => {
  return screen.getByText(text, { exact: isExact });
};

describe("Blog component tests", () => {
  const testTitle = "test title";
  const testAuthor = "testAuthor";
  const testURL = "testURL";
  const testLikes = 42;
  const testUsername = "testaaja";
  const testName = "juuri";

  const testblog = {
    title: testTitle,
    author: testAuthor,
    url: testURL,
    likes: testLikes,
    user: {
      username: testUsername,
      name: testName,
      id: "65aa8bd975f6e80f48ec91a0",
    },
  };

  const testuser = {
    username: "automaattitestaaja",
    name: "testaaja",
    password: "salainen",
  };

  test("Blog component renders the title", () => {
    render(<Blog blog={testblog} user={testuser} />);

    screen.getAllByText(testTitle, {
      exact: false,
    });
  });

  test("Blog component renders url, likes and user when blog is in enlarged mode", async () => {
    render(<Blog blog={testblog} user={testuser} />);

    const user = userEvent.setup();
    const button = getByText("view");
    await user.click(button);

    expect(getByText(testURL)).not.toHaveStyle("display: none");
    expect(getByText(testLikes)).not.toHaveStyle("display: none");
    expect(getByText(testName)).not.toHaveStyle("display: none");
  });

  test("Like event handler gets called two times if like button is pressed two times", async () => {
    const mockHandler = jest.fn();
    render(<Blog blog={testblog} user={testuser} mockHandler={mockHandler} />);

    const user = userEvent.setup();
    const viewButton = getByText("view");
    await user.click(viewButton);

    const likeButton = getByText("like");

    const timesClicked = 2;
    for (let i = 0; i < timesClicked; i++) {
      await user.click(likeButton);
    }
    expect(mockHandler.mock.calls).toHaveLength(timesClicked);
  });
});
