import {AuthorizationStatus} from "../../const";

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

export const getAuthorizationStatus = (state) => state.USER.authorizationStatus;

export const getIsAuthorized = (state) => state.USER.authorizationStatus === AuthorizationStatus.AUTH;

export const getIsNotAuthorized = (state) => state.USER.authorizationStatus !== AuthorizationStatus.AUTH;

export const getUser = (state) => state.USER.user;
