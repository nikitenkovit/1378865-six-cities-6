import {SET_NEAREST_OFFERS, CHANGE_CURRENT_OFFER_STATUS,
  SET_CURRENT_OFFER, SET_REVIEWS} from "./action-types";
import {LoadStatus} from "../../const";

const initialState = {
  current: {},
  reviews: [],
  nearest: [],
  status: LoadStatus.INITIAL,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CURRENT_OFFER_STATUS:
      return {
        ...state,
        status: action.payload
      };
    case SET_CURRENT_OFFER:
      return {
        ...state,
        current: action.payload
      };
    case SET_NEAREST_OFFERS:
      return {
        ...state,
        nearest: action.payload
      };
    case SET_REVIEWS:
      return {
        ...state,
        reviews: action.payload
      };
    default:
      return state;
  }
};
