import {REQUIRED_AUTHORIZATION, SET_USER} from "./action-types";

export default {
  requiredAuthorization: (status) => ({
    type: REQUIRED_AUTHORIZATION,
    payload: status
  }),
  setUser: (user) => ({
    type: SET_USER,
    payload: user
  })
};
