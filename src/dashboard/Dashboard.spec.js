import React from "react";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";
import { UPDATE_LOCK, UPDATE_GATE } from "../store/types";
import { render } from "react-testing-library";
import renderer from "react-test-renderer";
import "react-testing-library/cleanup-after-each"; // Prevents memory leaks after each test
import "jest-dom/extend-expect";

import Dashboard from "./Dashboard";
const ConnectedDashboard = connect(state => ({
  closed: state.reducer.closed,
  locked: state.reducer.locked
}))(Dashboard);

// Custom reducer function for testing
function reducer(
  state = { reducer: { closed: false, locked: false } },
  action
) {
  switch (action.type) {
    case UPDATE_LOCK:
      const updatedLock = !state.locked;
      return {
        ...state,
        locked: updatedLock
      };
    case UPDATE_GATE:
      const updatedGate = !state.closed;
      return {
        ...state,
        closed: updatedGate
      };
    default:
      return state;
  }
}

// Render for basic Jest tests
function renderWithRedux(
  ui,
  { initialState, store = createStore(reducer, initialState) } = {}
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store
  };
}

// Renderer for use in snapshot
function rendererWithRedux(
  ui,
  { initialState, store = createStore(reducer, initialState) } = {}
) {
  return {
    ...renderer.create(<Provider store={store}>{ui}</Provider>),
    store
  };
}

describe("<Dashboard />", () => {
  it("renders the Dashboard component without crashing", () => {
    const helpers = renderWithRedux(<ConnectedDashboard />);
  });

  it("matches the snapshot of Dashboard", () => {
    const tree = rendererWithRedux(<ConnectedDashboard />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("renders the Display component to the screen as a child component", () => {
    const { getByText } = renderWithRedux(<Dashboard />);
    expect(getByText(/Unlocked/i)).toBeTruthy(); // Checks if the default is unlocked in the display
  });

  it("renders the Controls component to the screen as a child component", () => {
    const { getByText } = renderWithRedux(<Dashboard />);
    expect(getByText(/Close Gate/i)).toBeTruthy(); // Checks if the default is an opened gate button
  });
});
