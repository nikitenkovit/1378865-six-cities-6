import UserActionCreator from "../../user/action-creator/action-creator";
import {AppRoute, AuthorizationStatus} from "../../../const";
import RedirectActionCreator from "../../middlewares/action-creator/action-creator";

export const logout = () => (dispatch, _getState, api) => (
  api.get(`/logout`)
    .then(() => {
      dispatch(UserActionCreator.setUser(null));
      dispatch(UserActionCreator.requiredAuthorization(AuthorizationStatus.NO_AUTH));
    })
    .then(() => dispatch(RedirectActionCreator.redirectToRoute(AppRoute.LOGIN)))
);
