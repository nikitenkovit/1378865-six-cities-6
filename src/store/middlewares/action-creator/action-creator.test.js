import {REDIRECT_TO_ROUTE} from "../action-types";
import ActionCreator from "./action-creator";

it(`Action creator redirect to route returns correct action`, () => {
  const url = `/login`;

  const expected = {
    type: REDIRECT_TO_ROUTE,
    payload: url
  };

  expect(ActionCreator.redirectToRoute(url)).toEqual(expected);
});
