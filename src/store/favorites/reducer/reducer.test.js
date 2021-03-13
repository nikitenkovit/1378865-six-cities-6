import favoritesReducer from "./reducer";
import {SET_FAVORITE_OFFERS, CHANGE_LOAD_FAVORITES_STATUS} from "../action-types";
import {LoadStatus} from "../../../const";

const initialState = {
  items: [],
  status: LoadStatus.INITIAL
};

const offer = {
  "bedrooms": 3,
  "city": {
    "location": {
      "latitude": 52.5909553943508,
      "longitude": 4.95309666406198,
      "zoom": 12
    },
    "name": `Amsterdam`
  },
  "description": `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
  "goods": [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
  "host": {
    "avatar_url": `./img/avatar-angelina.jpg`,
    "id": 3,
    "is_pro": true,
    "name": `Angelina`
  },
  "id": 1,
  "images": [`./img/apartment-01.jpg`, `./img/apartment-02.jpg`, `./img/apartment-03.jpg`, `./img/room.jpg`, `./img/apartment-02.jpg`, `./img/apartment-03.jpg`],
  "is_favorite": true,
  "is_premium": false,
  "location": {
    "latitude": 52.5909553943508,
    "longitude": 4.95309666406198,
    "zoom": 8
  },
  "max_adults": 4,
  "preview_image": `./img/apartment-01.jpg`,
  "price": 120,
  "rating": 4.8,
  "title": `Beautiful & luxurious studio at great location`,
  "type": `apartment`
};

describe(`Favorites reducer work correctly`, () => {
  it(`Reducer without parameters should initial state`, () => {

    expect(favoritesReducer(undefined, {}))
      .toEqual(initialState);
  });

  it(`Reducer should set favorite offers correctly`, () => {

    const action = {
      type: SET_FAVORITE_OFFERS,
      payload: [offer, offer, offer]
    };

    const expected = {
      items: [offer, offer, offer],
      status: LoadStatus.INITIAL
    };

    expect(favoritesReducer(initialState, action))
      .toEqual(expected);
  });

  it(`Reducer should change load favorites status correctly`, () => {

    const action = {
      type: CHANGE_LOAD_FAVORITES_STATUS,
      payload: LoadStatus.SUCCESS
    };

    const expected = {
      items: [],
      status: LoadStatus.SUCCESS
    };

    expect(favoritesReducer(initialState, action))
      .toEqual(expected);
  });
});
