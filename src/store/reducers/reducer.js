import { UPDATE_LOCK, UPDATE_GATE } from "../types";

const initialState = {
  locked: false,
  closed: false
};

export const reducer = (state = initialState, action) => {
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
};
