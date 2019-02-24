import { UPDATE_DATA } from "../actions/types";

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_DATA:
      return action.payload || false;
    default:
      return state;
  }
}
