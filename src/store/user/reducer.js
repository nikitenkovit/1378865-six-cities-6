import {AuthorizationStatus} from "../../const";
import {REQUIRED_AUTHORIZATION, GET_USER} from "./action-types";

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  user: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUIRED_AUTHORIZATION: {
      return {
        ...state,
        authorizationStatus: action.payload
      };
    }
    case GET_USER: {
      return {
        ...state,
        user: action.payload
      };
    }
    default:
      return state;
  }
};
