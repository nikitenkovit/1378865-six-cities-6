import {getIsNeedDisableForm, getIsNeedShowError, getIsNeedToClearForm} from "./selectors";
import {SendStatus} from "../../../const";

describe(`Test comment-status selectors`, () => {

  it(`getIsNeedDisableForm should be return 'true'`, () => {
    const mockStore = {
      COMMENT: {
        status: SendStatus.SENDING
      }
    };
    expect(getIsNeedDisableForm(mockStore)).toBe(true);
  });

  it(`getIsNeedDisableForm should be return 'false'`, () => {
    const mockStore = {
      COMMENT: {
        status: SendStatus.INITIAL
      }
    };
    expect(getIsNeedDisableForm(mockStore)).toBe(false);
  });

  it(`getIsNeedShowError should be return 'true'`, () => {
    const mockStore = {
      COMMENT: {
        status: SendStatus.FAILURE
      }
    };
    expect(getIsNeedShowError(mockStore)).toBe(true);
  });

  it(`getIsNeedShowError should be return 'false'`, () => {
    const mockStore = {
      COMMENT: {
        status: SendStatus.SUCCESS
      }
    };
    expect(getIsNeedShowError(mockStore)).toBe(false);
  });

  it(`getIsNeedToClearForm should be return 'true'`, () => {
    const mockStore = {
      COMMENT: {
        status: SendStatus.SUCCESS
      }
    };
    expect(getIsNeedToClearForm(mockStore)).toBe(true);
  });

  it(`getIsNeedToClearForm should be return 'false'`, () => {
    const mockStore = {
      COMMENT: {
        status: SendStatus.FAILURE
      }
    };
    expect(getIsNeedToClearForm(mockStore)).toBe(false);
  });
});
