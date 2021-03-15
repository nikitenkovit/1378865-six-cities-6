import {CHANGE_OFFER_LOCATION} from "../action-types";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_OFFER_LOCATION:
      return {
        ...action.payload
      };
    default:
      return state;
  }
};
