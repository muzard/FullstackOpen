import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./NewBlog";

describe("Form tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Form handler gets right variables when submitted", async () => {
    const mockHandler = jest.fn();

    render(<BlogForm createBlog={mockHandler} />);

    const inputTitle = screen.getByPlaceholderText("type title here...");
    const inputAuthor = screen.getByPlaceholderText("author's name here");
    const inputURL = screen.getByPlaceholderText("url here");
    const submitButton = screen.getByText("create");

    await userEvent.type(inputTitle, "test title");
    await userEvent.type(inputAuthor, "test author");
    await userEvent.type(inputURL, "test url");
    await userEvent.click(submitButton);

    const calls = mockHandler.mock.calls[0][0];

    expect(Object.keys(calls)).toHaveLength(3);
    expect(calls["author"]).toBe("test author");
    expect(calls["title"]).toBe("test title");
    expect(calls["url"]).toBe("test url");
  });
});
