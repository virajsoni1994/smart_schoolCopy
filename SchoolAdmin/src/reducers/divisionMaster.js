import { GET_DIVISIONDATA } from "../actions/types";

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_DIVISIONDATA:
      return action.payload || false;
    default:
      return state;
  }
}
