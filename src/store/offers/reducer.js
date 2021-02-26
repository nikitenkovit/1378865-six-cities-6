import {LOAD_OFFERS} from "./action-types";

const initialState = {
  offers: [],
  isDataLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_OFFERS:
      return {
        ...state,
        offers: action.payload,
        isDataLoading: true,
      };
    default:
      return state;
  }
};
