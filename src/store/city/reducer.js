import {CHANGE_CITY} from "./action-types";
import {getCurrentCity} from "../../utils/common";

const initialState = {
  city: getCurrentCity()
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CITY:
      return {
        ...state,
        city: action.payload
      };
    default:
      return state;
  }
};
