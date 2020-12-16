import { render } from "@testing-library/react";
import React from "react";
import { create } from "react-test-renderer";
import { Box } from "../Box";

describe("<Box />", () => {
  it("should be defined", () => {
    expect.assertions(1);
    expect(Box).toBeDefined();
  });

  it("should match the snapshot", () => {
    expect.assertions(1);
    expect(create(<Box>Text</Box>).toJSON()).toMatchSnapshot();
  });

  it("should work with @testing-library/react", () => {
    expect.assertions(2);
    const text = "Text";
    const {
      container,
    } = render(<Box>{text}</Box>);

    expect(container.className).toBeDefined();
    expect(container.querySelector("div")!.textContent).toStrictEqual(text);
  });
});
