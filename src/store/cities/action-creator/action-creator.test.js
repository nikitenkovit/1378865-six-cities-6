import {SET_ITEMS, CHANGE_CITY} from "../action-types";
import ActionCreator from './action-creator';
import {DefaultCitiesList} from "../../../const";

describe(`Cities action creators work correctly`, () => {
  it(`Action creator set cities items returns correct action`, () => {
    const items = DefaultCitiesList;

    const expected = {
      type: SET_ITEMS,
      payload: items
    };

    expect(ActionCreator.setCitiesItems(items)).toEqual(expected);
  });

  it(`Action creator change city returns correct action`, () => {
    const city = {name: `Paris`};

    const expected = {
      type: CHANGE_CITY,
      payload: city
    };

    expect(ActionCreator.changeCity(city)).toEqual(expected);
  });
});
