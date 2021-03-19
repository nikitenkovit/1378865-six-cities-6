import {CHANGE_SERVICE_AVAILABLE_STATUS} from "../action-types";
import ActionCreator from "./action-creator";
import {ServiceAvailableStatus} from "../../../const";

describe(`Service available status action creators work correctly`, () => {
  it(`Action creator change service available status returns correct action`, () => {
    const status = ServiceAvailableStatus.UNAVAILABLE;

    const expected = {
      type: CHANGE_SERVICE_AVAILABLE_STATUS,
      payload: status
    };

    expect(ActionCreator.changeServiceAvailableStatus(status)).toEqual(expected);
  });
});
