import UserActionCreator from "../../user/action-creator/action-creator";
import {AuthorizationStatus} from "../../../const";

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(`/login`)
    .then(() => {
      dispatch(UserActionCreator.requiredAuthorization(AuthorizationStatus.AUTH));
    })
    .catch(() => {
      dispatch(UserActionCreator.requiredAuthorization(AuthorizationStatus.NO_AUTH));
    })
);
