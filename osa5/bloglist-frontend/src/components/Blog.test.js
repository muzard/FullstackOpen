import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

describe("Blog component tests", () => {
  const testblog = {
    title: "getByText should find this",
    author: "1",
    url: "2",
    likes: 0,
    user: {
      username: "root",
      name: "juuri",
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

    const element = screen.getAllByText("getByText should find this", {
      exact: false,
    });
  });
});
