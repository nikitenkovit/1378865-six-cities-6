import {AuthorizationStatus} from "../../const";
import NameSpace from "../name-space";
import {createSelector} from "reselect";

export const adaptUserData = (data) => {
  const user = {
    ...data,
    avatarUrl: data.avatar_url,
    isPro: data.is_pro,
  };

  delete user.avatar_url;
  delete user.is_pro;

  return user;
};

export const getAuthorizationStatus = (state) => state[NameSpace.USER].authorizationStatus;

export const getIsAuthorized = (state) => {
  return createSelector(
      getAuthorizationStatus,
      (status) => status === AuthorizationStatus.AUTH)(state);
};

export const getIsNotAuthorized = (state) => {
  return createSelector(
      getAuthorizationStatus,
      (status) => status !== AuthorizationStatus.AUTH)(state);
};

export const getUser = (state) => state[NameSpace.USER].user;
