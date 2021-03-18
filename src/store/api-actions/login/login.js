import {adaptUserData} from "../../user/selectors/selectors";
import UserActionCreator from "../../user/action-creator/action-creator";
import {AppRoute, AuthorizationStatus} from "../../../const";
import RedirectActionCreator from "../../middlewares/action-creator/action-creator";

export const login = (email, password) => async (dispatch, _getState, api) => {
  let sendLogin;

  try {
    sendLogin = await api.post(`/login`, {email, password});
  } catch (e) {
    dispatch(UserActionCreator.requiredAuthorization(AuthorizationStatus.NO_AUTH));
    return;
  }

  const user = await adaptUserData(sendLogin.data);

  dispatch(UserActionCreator.setUser(user));
  dispatch(UserActionCreator.requiredAuthorization(AuthorizationStatus.AUTH));

  dispatch(RedirectActionCreator.redirectToRoute(AppRoute.MAIN));
};
