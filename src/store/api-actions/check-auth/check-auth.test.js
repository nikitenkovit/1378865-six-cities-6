import MockAdapter from 'axios-mock-adapter';
import {createAPI} from "../../../api";
import {checkAuth} from "./check-auth";
import {REQUIRED_AUTHORIZATION} from "../../user/action-types";
import {AuthorizationStatus} from "../../../const";

describe(`Should checkAuth work correctly`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const SUCCESS_STATUS = 200;
  const FAILURE_STATUS = 400;
  const LOGIN_URL = `/login`;
  const dispatch = jest.fn();
  const _getState = jest.fn();
  const api = createAPI(() => jest.fn());
  const apiMock = new MockAdapter(api);
  const fetchAuth = checkAuth();

  it(`Should make a correct API call to /login when status is successful`, () => {
    apiMock
      .onGet(LOGIN_URL)
      .reply(SUCCESS_STATUS);

    return fetchAuth(dispatch, _getState, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: REQUIRED_AUTHORIZATION,
          payload: AuthorizationStatus.AUTH,
        });
      });
  });

  it(`Should make a correct API call to /login when status is failure`, () => {
    apiMock
      .onGet(LOGIN_URL)
      .reply(FAILURE_STATUS);

    return fetchAuth(dispatch, _getState, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: REQUIRED_AUTHORIZATION,
          payload: AuthorizationStatus.NO_AUTH,
        });
      });
  });
});
