import MockAdapter from 'axios-mock-adapter';
import {createAPI} from "../../../api";
import {logout} from "./logout";
import {REQUIRED_AUTHORIZATION, SET_USER} from "../../user/action-types";
import {AuthorizationStatus} from "../../../const";

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

  it(`Should make a correct API call to /logout`, () => {
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
      });
  });
});
