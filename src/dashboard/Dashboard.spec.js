import React from "react";
import { render } from "react-testing-library";
import renderer from "react-test-renderer";
import "react-testing-library/cleanup-after-each";
import "jest-dom/extend-expect";

import Dashboard from "./Dashboard";

describe("<Dashboard />", () => {
  it("renders the Dashboard component without crashing", () => {
    const helpers = render(<Dashboard />);
  });

  it("matches the snapshot of Dashboard", () => {
    const tree = renderer.create(<Dashboard />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("renders the Display component to the screen as a child component", () => {
    const { getByText } = render(<Dashboard />);
    expect(getByText("Unlocked")).toBeTruthy(); // Checks if the default is unlocked in the display
  });

  it("renders the Controls component to the screen as a child component", () => {
    const { getByText } = render(<Dashboard />);
    expect(getByText("Close Gate")).toBeTruthy(); // Checks if the default is an opened gate button
  });
});
