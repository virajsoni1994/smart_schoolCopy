import { FETCH_USERS } from "../actions/types";

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS:
      return action.payload || false;
    default:
      return state;
  }
}
