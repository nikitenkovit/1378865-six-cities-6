import {SET_OFFERS, CHANGE_STATUS, UPDATE_OFFERS} from "./action-types";
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
    case UPDATE_OFFERS:
      return {
        ...state,
        items: state.items.map((it) => it.id === action.payload.id ? action.payload : it)
      };
    default:
      return state;
  }
};
