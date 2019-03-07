import React from "react";
import { render } from "react-testing-library";
import renderer from "react-test-renderer";
import "react-testing-library/cleanup-after-each"; // Prevents memory leaks after each test
import "jest-dom/extend-expect";

import Display from "./Display";

describe("<Display />", () => {
  it("renders the Display component to the screen without crashing", () => {
    const helpers = render(<Display closed={false} locked={false} />);
  });

  it("matches the snapshot of Display", () => {
    const tree = renderer.create(<Display />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("should render as open and unlocked onto the screen when passed appropriate props", () => {
    const { getByText } = render(<Display closed={false} locked={false} />);
    const unlockedDisplay = getByText(/Unlocked/i);
    const openDisplay = getByText(/Open/i);
    expect(unlockedDisplay).toBeDefined();
    expect(openDisplay).toBeDefined();
  });

  it("should render as closed and locked onto the screen when passed appropriate props", () => {
    const { getByText } = render(<Display closed={true} locked={true} />);
    const unlockedDisplay = getByText(/Locked/i);
    const openDisplay = getByText(/Closed/i);
    expect(unlockedDisplay).toBeDefined();
    expect(openDisplay).toBeDefined();
  });

  it("changes classes for different colors when the closed/locked props' boolean value changes", () => {
    const { getByText, rerender } = render(
      <Display closed={false} locked={false} />
    );
    const unlockedDisplay = getByText(/Unlocked/i);
    const openDisplay = getByText(/Open/i);
    expect(unlockedDisplay.className).toBe("led green-led");
    expect(openDisplay.className).toBe("led green-led");
    rerender(<Display closed={true} locked={true} />);
    const lockedDisplay = getByText(/Locked/i);
    const closedDisplay = getByText(/Closed/i);
    expect(lockedDisplay.className).toBe("led red-led");
    expect(closedDisplay.className).toBe("led red-led");
  });
});
