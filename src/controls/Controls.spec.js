import React from "react";
import { render, fireEvent } from "react-testing-library";
import renderer from "react-test-renderer";
import "react-testing-library/cleanup-after-each"; // Prevents memory leaks after each test
import "jest-dom/extend-expect";

import Controls from "./Controls";

describe("<Controls />", () => {
  it("renders the component without crashing", () => {
    const helpers = render(<Controls />);
  });

  it("should match the snapshot of Controls", () => {
    const tree = renderer.create(<Controls />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("should render the gate default as open on page load", () => {
    const { getByText } = render(<Controls />);
    expect(getByText(/Close Gate/i)).toBeTruthy();
  });

  it("should invoke a function when the open/close gate button is fired", () => {
    const mock = jest.fn();
    const { getByText } = render(
      <Controls closed={false} toggleClosed={mock} />
    );
    const openBtn = getByText(/Close Gate/i);
    fireEvent.click(openBtn);
    expect(mock).toHaveBeenCalledTimes(1);
  });

  it("should invoke a function when the unlock/lock button is fired", () => {
    const mock = jest.fn();
    const { getByText } = render(
      <Controls closed={true} locked={true} toggleLocked={mock} />
    );
    const lockBtn = getByText(/Unlock Gate/i);
    fireEvent.click(lockBtn);
    expect(mock).toHaveBeenCalledTimes(1);
  });
});
