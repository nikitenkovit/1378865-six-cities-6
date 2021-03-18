import {REQUIRED_AUTHORIZATION, SET_USER, SET_STATUS_BAD_LOGIN_REQUEST} from "../action-types";

export default {
  requiredAuthorization: (status) => ({
    type: REQUIRED_AUTHORIZATION,
    payload: status
  }),
  setUser: (user) => ({
    type: SET_USER,
    payload: user
  }),
  setStatusBadLoginRequest: (status) => ({
    type: SET_STATUS_BAD_LOGIN_REQUEST,
    payload: status
  })
};
