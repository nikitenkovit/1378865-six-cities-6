import {CHANGE_CITY} from "./action-types";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CITY:
      return {
        ...action.payload
      };
    default:
      return state;
  }
};
