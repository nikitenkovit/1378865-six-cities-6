import MockAdapter from 'axios-mock-adapter';
import {createAPI} from "../../../api";
import {logout} from "./logout";
import {REQUIRED_AUTHORIZATION, SET_USER} from "../../user/action-types";
import {AppRoute, AuthorizationStatus} from "../../../const";
import {REDIRECT_TO_ROUTE} from "../../middlewares/action-types";

describe(`logout work correctly`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const SUCCESS_STATUS = 200;
  const URL = `/logout`;
  const dispatch = jest.fn();
  const _getState = jest.fn();
  const api = createAPI(() => jest.fn());
  const apiMock = new MockAdapter(api);
  const setLogout = logout();

  it(`Should make a correct API call to /logout and should change route to '/login'`, () => {
    apiMock
      .onGet(URL)
      .reply(SUCCESS_STATUS);

    return setLogout(dispatch, _getState, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: SET_USER,
          payload: null,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: REQUIRED_AUTHORIZATION,
          payload: AuthorizationStatus.NO_AUTH
        });

        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: REDIRECT_TO_ROUTE,
          payload: AppRoute.LOGIN,
        });
      });
  });
});
