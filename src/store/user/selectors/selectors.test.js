import {adaptUserData, getIsAuthorized, getIsNeedShowSpiner} from "./selectors";
import {AuthorizationStatus} from "../../../const";

describe(`Test user selectors`, () => {
  it(`adaptUserData should be work correctly`, () => {
    const mockData = {
      'id': 1,
      'email': `test@test.ru`,
      'name': `test`,
      'avatar_url': `test`,
      'is_pro': false
    };

    const expected = {
      'id': 1,
      'email': `test@test.ru`,
      'name': `test`,
      'avatarUrl': `test`,
      'isPro': false
    };

    expect(adaptUserData(mockData)).toEqual(expected);
  });

  it(`getIsAuthorized should be return 'true'`, () => {
    const mockStore = {
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
      }
    };
    expect(getIsAuthorized(mockStore)).toBe(true);
  });

  it(`getIsAuthorized should be return 'false'`, () => {
    const mockStore = {
      USER: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      }
    };
    expect(getIsAuthorized(mockStore)).toBe(false);
  });

  it(`getIsNeedShowSpiner should be return 'true'`, () => {
    const mockStore = {
      USER: {
        authorizationStatus: null,
      }
    };
    expect(getIsNeedShowSpiner(mockStore)).toBe(true);
  });

  it(`getIsNeedShowSpiner should be return 'false'`, () => {
    const mockStore = {
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
      }
    };
    expect(getIsNeedShowSpiner(mockStore)).toBe(false);
  });
});
