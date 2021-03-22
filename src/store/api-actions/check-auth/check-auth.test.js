import MockAdapter from 'axios-mock-adapter';
import {createAPI} from "../../../api";
import {checkAuth} from "./check-auth";
import {REQUIRED_AUTHORIZATION, SET_USER} from "../../user/action-types";
import {AuthorizationStatus} from "../../../const";
import {adaptUserData} from "../../user/selectors/selectors";

const mockUser = {
  'id': 1,
  'email': `test@test.ru`,
  'name': `test`,
  'avatar_url': `test`,
  'is_pro': false
};

describe(`Should checkAuth work correctly`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const SUCCESS_STATUS = 200;
  const LOGIN_URL = `/login`;
  const dispatch = jest.fn();
  const _getState = jest.fn();
  const api = createAPI(() => jest.fn());
  const apiMock = new MockAdapter(api);
  const fetchAuth = checkAuth();
  const data = mockUser;
  const adaptedUserData = adaptUserData(mockUser);


  it(`Should make a correct API call to /login when status is successful`, () => {
    apiMock
      .onGet(LOGIN_URL)
      .reply(SUCCESS_STATUS, data);

    return fetchAuth(dispatch, _getState, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

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
});
