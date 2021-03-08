import {LoadStatus} from "../../const";
import {SET_FAVORITE_OFFERS, CHANGE_LOAD_FAVORITES_STATUS} from "./action-types";

const initialState = {
  items: [],
  status: LoadStatus.INITIAL
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FAVORITE_OFFERS:
      return {
        ...state,
        items: action.payload
      };
    case CHANGE_LOAD_FAVORITES_STATUS:
      return {
        ...state,
        status: action.payload
      };
    default:
      return state;
  }
};
