import MockAdapter from 'axios-mock-adapter';
import {createAPI} from "../../../api";
import {login} from "./login";
import {AuthorizationStatus} from "../../../const";
import {REQUIRED_AUTHORIZATION, SET_USER} from "../../user/action-types";
import {adaptUserData} from "../../user/selectors/selectors";

const mockUser = {
  'id': 1,
  'email': `test@test.ru`,
  'name': `test`,
  'avatar_url': `test`,
  'is_pro': false
};

describe(`login work correctly`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const SUCCESS_STATUS = 200;
  const FAILURE_STATUS = 400;
  const URL = `/login`;
  const dispatch = jest.fn();
  const _getState = jest.fn();
  const api = createAPI(() => jest.fn());
  const apiMock = new MockAdapter(api);
  const sendLogin = login();
  const data = mockUser;
  const adaptedUserData = adaptUserData(mockUser);

  it(`Should make a correct API call to /login when status is successful`, () => {
    apiMock
      .onPost(URL)
      .reply(SUCCESS_STATUS, data);

    return sendLogin(dispatch, _getState, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: SET_USER,
          payload: adaptedUserData,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: REQUIRED_AUTHORIZATION,
          payload: AuthorizationStatus.AUTH,
        });
      });
  });

  it(`Should make a correct API call to /login when status is failure`, () => {
    apiMock
      .onPost(URL)
      .reply(FAILURE_STATUS);

    return sendLogin(dispatch, _getState, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: REQUIRED_AUTHORIZATION,
          payload: AuthorizationStatus.NO_AUTH,
        });
      });
  });
});
