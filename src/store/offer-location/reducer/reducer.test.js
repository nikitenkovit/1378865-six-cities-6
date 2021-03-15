import offerLocationReducer from "./reducer";
import {CHANGE_OFFER_LOCATION} from "../action-types";

const initialState = {};

describe(`Offer location reducer work correctly`, () => {
  it(`Reducer without parameters should initial state`, () => {

    expect(offerLocationReducer(undefined, {}))
      .toEqual(initialState);
  });

  it(`Reducer should change offer location correctly`, () => {

    const action = {
      type: CHANGE_OFFER_LOCATION,
      payload: {
        "latitude": 52.5909553943508,
        "longitude": 4.95309666406198,
        "zoom": 12
      }
    };

    const expected = {
      "latitude": 52.5909553943508,
      "longitude": 4.95309666406198,
      "zoom": 12
    };

    expect(offerLocationReducer(initialState, action))
      .toEqual(expected);
  });
});
