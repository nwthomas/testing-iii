import { UPDATE_LOCK, UPDATE_GATE } from "../types";

export const toggleLocked = () => {
  return {
    type: UPDATE_LOCK
  };
};

export const toggleClosed = () => {
  return {
    type: UPDATE_GATE
  };
};
