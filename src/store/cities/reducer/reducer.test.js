import citiesReducer from './reducer';
import {SET_ITEMS, CHANGE_CITY} from "../action-types";
import {DefaultCitiesList, DEFAULT_CURRENT_CITY} from "../../../const";

const initialState = {
  items: DefaultCitiesList,
  current: DEFAULT_CURRENT_CITY
};

describe(`Cities reducer work correctly`, () => {
  it(`Reducer without parameters should initial state`, () => {

    expect(citiesReducer(undefined, {}))
      .toEqual(initialState);
  });

  it(`Reducer should set correct cities items`, () => {

    const action = {
      type: SET_ITEMS,
      payload: [
        {name: `Dusseldorf`},
        {name: `Cologne`},
        {name: `Amsterdam`},
        {name: `Brussels`},
        {name: `Hamburg`},
        {name: `Paris`},
      ]
    };

    const expected = {
      items: [
        {name: `Dusseldorf`},
        {name: `Cologne`},
        {name: `Amsterdam`},
        {name: `Brussels`},
        {name: `Hamburg`},
        {name: `Paris`},
      ],
      current: DEFAULT_CURRENT_CITY
    };

    expect(citiesReducer(initialState, action))
      .toEqual(expected);
  });

  it(`Reducer should change city correctly`, () => {

    const action = {
      type: CHANGE_CITY,
      payload: {name: `Amsterdam`}
    };

    const expected = {
      items: DefaultCitiesList,
      current: {name: `Amsterdam`}
    };

    expect(citiesReducer(initialState, action))
      .toEqual(expected);
  });
});
