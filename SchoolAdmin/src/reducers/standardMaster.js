import { GET_STANDARDDATA } from "../actions/types";

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_STANDARDDATA:
      return action.payload || false;
    default:
      return state;
  }
}
