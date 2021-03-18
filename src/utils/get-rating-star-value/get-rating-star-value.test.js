import {getRatingStarValue} from "./get-rating-star-value";

it(`getRatingStarValue work correctly`, () => {
  const mockNumber = 4.2;

  const expected = `80%`;

  expect(getRatingStarValue(mockNumber)).toEqual(expected);
});
