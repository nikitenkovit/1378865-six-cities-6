import userReducer from "./reducer";
import {REQUIRED_AUTHORIZATION, SET_USER, SET_STATUS_BAD_LOGIN_REQUEST} from "../action-types";
import {AuthorizationStatus} from "../../../const";

const initialState = {
  authorizationStatus: null,
  user: null,
  statusBadLoginRequest: false
};

describe(`User reducer work correctly`, () => {
  it(`Reducer without parameters should initial state`, () => {

    expect(userReducer(undefined, {}))
      .toEqual(initialState);
  });

  it(`Reducer should change authorization status correctly`, () => {

    const action = {
      type: REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH
    };

    const expected = {
      authorizationStatus: AuthorizationStatus.AUTH,
      user: null,
      statusBadLoginRequest: false
    };

    expect(userReducer(initialState, action))
      .toEqual(expected);
  });

  it(`Reducer should set user correctly`, () => {

    const user = {
      id: 1,
      email: `123@ya.ru`,
      name: `123`,
      avatarUrl: `https://assets.htmlacademy.ru/intensives/javascript-3/avatar/7.jpg`,
      isPro: false
    };

    const action = {
      type: SET_USER,
      payload: user
    };

    const expected = {
      authorizationStatus: null,
      user,
      statusBadLoginRequest: false
    };

    expect(userReducer(initialState, action))
      .toEqual(expected);
  });

  it(`Reducer should set status bad login request correctly`, () => {

    const status = true;

    const action = {
      type: SET_STATUS_BAD_LOGIN_REQUEST,
      payload: status
    };

    const expected = {
      authorizationStatus: null,
      user: null,
      statusBadLoginRequest: status
    };

    expect(userReducer(initialState, action))
      .toEqual(expected);
  });
});
