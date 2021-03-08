import {SET_ITEMS, CHANGE_CITY} from "./action-types";
import {DefaultCitiesList, DEFAULT_CURRENT_CITY} from "../../const";

const initialState = {
  items: DefaultCitiesList,
  current: DEFAULT_CURRENT_CITY
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
