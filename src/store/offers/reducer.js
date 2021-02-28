import {SET_OFFERS, CHANGE_STATUS} from "./action-types";
import {LoadStatus} from "../../const";

const initialState = {
  offers: [],
  status: LoadStatus.INITIAL,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_OFFERS:
      return {
        ...state,
        offers: action.payload
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
