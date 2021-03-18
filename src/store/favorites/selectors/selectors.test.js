import {getIsNeedShowSpiner, getIsNeedShowEmptyScreen} from "./selectors";
import {LoadStatus} from "../../../const";

describe(`Test favorites selectors`, () => {
  it(`getIsNeedShowSpiner should be return 'true'`, () => {
    const mockStore = {
      FAVORITES: {
        items: [],
        status: LoadStatus.INITIAL
      },
    };
    expect(getIsNeedShowSpiner(mockStore)).toBe(true);
  });

  it(`getIsNeedShowSpiner should be return 'false'`, () => {
    const mockStore = {
      FAVORITES: {
        items: [],
        status: LoadStatus.SUCCESS
      },
    };
    expect(getIsNeedShowSpiner(mockStore)).toBe(false);
  });

  it(`getIsNeedShowEmptyScreen should be return 'true'`, () => {
    const mockStore = {
      FAVORITES: {
        items: [],
        status: LoadStatus.SUCCESS
      },
    };
    expect(getIsNeedShowEmptyScreen(mockStore)).toBe(true);
  });

  it(`getIsNeedShowEmptyScreen should be return 'false'`, () => {
    const mockStore = {
      FAVORITES: {
        items: [{}],
        status: LoadStatus.SUCCESS
      },
    };
    expect(getIsNeedShowEmptyScreen(mockStore)).toBe(false);
  });
});
