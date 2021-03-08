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
      const index = state.items.findIndex(({id}) => id === action.payload.id);

      if (index === -1) {
        return state;
      }

      return {
        ...state,
        items: [
          ...state.items.slice(0, index),
          action.payload,
          ...state.items.slice(index + 1)
        ]
      };
    default:
      return state;
  }
};
