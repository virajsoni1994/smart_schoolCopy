import { UPDATE_DATA } from "./types";

export const clearUpdate = () => async dispatch => {
  dispatch({ type: UPDATE_DATA, payload: {} });
};
