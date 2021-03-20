import {getIsNeedShowSpiner, getIsNeedShowNotFoundScreen, adaptCommentsData} from "./selectors";
import {LoadStatus} from "../../../const";

describe(`Test current-offer selectors`, () => {
  it(`adaptCommentsData should be work correctly`, () => {
    const mockData = {
      "comment": `test`,
      "date": `2019-05-08T14:13:56.569Z`,
      "id": 1,
      "rating": 4,
      "user": {
        "avatar_url": `test`,
        "id": 4,
        "is_pro": false,
        "name": `test`
      }
    };

    const expected = {
      "comment": `test`,
      "date": `2019-05-08T14:13:56.569Z`,
      "id": 1,
      "rating": 4,
      "user": {
        "avatarUrl": `test`,
        "id": 4,
        "isPro": false,
        "name": `test`
      }
    };

    expect(adaptCommentsData(mockData)).toEqual(expected);
  });

  it(`getIsNeedShowSpiner should be return 'true'`, () => {
    const mockStore = {
      CURRENT_OFFER: {
        status: LoadStatus.FETCHING
      },
    };
    expect(getIsNeedShowSpiner(mockStore)).toBe(true);
  });

  it(`getIsNeedShowSpiner should be return 'false'`, () => {
    const mockStore = {
      CURRENT_OFFER: {
        status: LoadStatus.SUCCESS
      },
    };
    expect(getIsNeedShowSpiner(mockStore)).toBe(false);
  });

  it(`getIsNeedShowNotFoundScreen should be return 'true'`, () => {
    const mockStore = {
      CURRENT_OFFER: {
        status: LoadStatus.FAILURE
      },
    };
    expect(getIsNeedShowNotFoundScreen(mockStore)).toBe(true);
  });

  it(`getIsNeedShowNotFoundScreen should be return 'false'`, () => {
    const mockStore = {
      CURRENT_OFFER: {
        status: LoadStatus.SUCCESS
      },
    };
    expect(getIsNeedShowNotFoundScreen(mockStore)).toBe(false);
  });
});
