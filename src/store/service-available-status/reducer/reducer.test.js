import serviceAvailableStatus from "./reducer";
import {CHANGE_SERVICE_AVAILABLE_STATUS} from "../action-types";
import {ServiceAvailableStatus} from "../../../const";

const initialState = {
  status: ServiceAvailableStatus.AVAILABLE,
};

describe(`service available status reducer work correctly`, () => {
  it(`Reducer without parameters should initial state`, () => {

    expect(serviceAvailableStatus(undefined, {}))
      .toEqual(initialState);
  });

  it(`Reducer should set offers correctly`, () => {

    const action = {
      type: CHANGE_SERVICE_AVAILABLE_STATUS,
      payload: ServiceAvailableStatus.UNAVAILABLE
    };

    const expected = {
      status: ServiceAvailableStatus.UNAVAILABLE,
    };

    expect(serviceAvailableStatus(initialState, action))
      .toEqual(expected);
  });
});
