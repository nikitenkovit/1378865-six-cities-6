import {CHANGE_CITY} from "./action-types";
import {getCurrentCity} from "./city-utils";

const initialState = {
  ...getCurrentCity()
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CITY:
      return {
        ...action.payload
      };
    default:
      return state;
  }
};
