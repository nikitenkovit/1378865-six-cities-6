import {CHANGE_OFFER_LOCATION} from "../action-types";
import ActionCreator from "./action-creator";

it(`Action creator change offer location returns correct action`, () => {
  const location = {
    "latitude": 52.5909553943508,
    "longitude": 4.95309666406198,
    "zoom": 12
  };

  const expected = {
    type: CHANGE_OFFER_LOCATION,
    payload: location
  };

  expect(ActionCreator.changeOfferLocation(location)).toEqual(expected);
});
