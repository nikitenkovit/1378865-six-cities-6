import {SET_ITEMS, CHANGE_CITY} from "./action-types";

const initialState = {
  items: [],
  current: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ITEMS:
      return {
        ...state,
        items: action.payload
      };
    case CHANGE_CITY:
      return {
        ...state,
        current: action.payload
      };
    default:
      return state;
  }
};
