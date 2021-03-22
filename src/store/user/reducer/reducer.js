import {REQUIRED_AUTHORIZATION, SET_USER, SET_STATUS_BAD_LOGIN_REQUEST} from "../action-types";

const initialState = {
  authorizationStatus: null,
  user: null,
  statusBadLoginRequest: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUIRED_AUTHORIZATION: {
      return {
        ...state,
        authorizationStatus: action.payload
      };
    }
    case SET_USER: {
      return {
        ...state,
        user: action.payload
      };
    }
    case SET_STATUS_BAD_LOGIN_REQUEST: {
      return {
        ...state,
        statusBadLoginRequest: action.payload
      };
    }
    default:
      return state;
  }
};
