import {SET_OFFERS, CHANGE_STATUS} from "./action-types";
import {LoadStatus} from "../../const";

const initialState = {
  items: [],
  status: LoadStatus.INITIAL,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_OFFERS:
      return {
        ...state,
        items: action.payload
      };
    case CHANGE_STATUS:
      return {
        ...state,
        status: action.payload
      };
    default:
      return state;
  }
};
