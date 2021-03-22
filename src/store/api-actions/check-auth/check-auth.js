import UserActionCreator from "../../user/action-creator/action-creator";
import {AuthorizationStatus} from "../../../const";
import {adaptUserData} from "../../user/selectors/selectors";
import {batch} from "react-redux";

export const checkAuth = () => async (dispatch, _getState, api) => {
  let getLogin;

  try {
    getLogin = await api.get(`/login`);
  } catch (e) {
    return;
  }

  const user = await adaptUserData(getLogin.data);

  batch(() => {
    dispatch(UserActionCreator.setUser(user));

    dispatch(UserActionCreator.requiredAuthorization(AuthorizationStatus.AUTH));
  });
};
