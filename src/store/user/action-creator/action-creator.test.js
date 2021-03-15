import {REQUIRED_AUTHORIZATION, SET_USER} from "../action-types";
import ActionCreator from "./action-creator";
import {AuthorizationStatus} from "../../../const";

describe(`User action creators work correctly`, () => {
  it(`Action creator required authorization returns correct action`, () => {
    const status = AuthorizationStatus.AUTH;

    const expected = {
      type: REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH
    };

    expect(ActionCreator.requiredAuthorization(status)).toEqual(expected);
  });

  it(`Action creator set user returns correct action`, () => {
    const user = {
      id: 1,
      email: `123@ya.ru`,
      name: `123`,
      avatarUrl: `https://assets.htmlacademy.ru/intensives/javascript-3/avatar/7.jpg`,
      isPro: false
    };

    const expected = {
      type: SET_USER,
      payload: user
    };

    expect(ActionCreator.setUser(user)).toEqual(expected);
  });
});
