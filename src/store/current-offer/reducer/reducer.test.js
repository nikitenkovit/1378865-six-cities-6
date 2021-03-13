import currentOfferReducer from "./reducer";
import {SET_CURRENT_OFFER, CHANGE_CURRENT_OFFER_STATUS, SET_NEAREST_OFFERS, SET_REVIEWS} from "../action-types";
import {LoadStatus} from "../../../const";

const initialState = {
  current: {},
  reviews: [],
  nearest: [],
  status: LoadStatus.INITIAL,
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

describe(`Current offer reducer work correctly`, () => {
  it(`Reducer without parameters should initial state`, () => {

    expect(currentOfferReducer(undefined, {}))
      .toEqual(initialState);
  });

  it(`Reducer should set current offer correctly`, () => {

    const action = {
      type: SET_CURRENT_OFFER,
      payload: offer
    };

    const expected = {
      current: offer,
      reviews: [],
      nearest: [],
      status: LoadStatus.INITIAL,
    };

    expect(currentOfferReducer(initialState, action))
      .toEqual(expected);
  });

  it(`Reducer should change current offer status correctly`, () => {

    const action = {
      type: CHANGE_CURRENT_OFFER_STATUS,
      payload: LoadStatus.SUCCESS
    };

    const expected = {
      current: {},
      reviews: [],
      nearest: [],
      status: LoadStatus.SUCCESS,
    };

    expect(currentOfferReducer(initialState, action))
      .toEqual(expected);
  });

  it(`Reducer should set nearest offers correctly`, () => {

    const action = {
      type: SET_NEAREST_OFFERS,
      payload: [offer, offer, offer]
    };

    const expected = {
      current: {},
      reviews: [],
      nearest: [offer, offer, offer],
      status: LoadStatus.INITIAL,
    };

    expect(currentOfferReducer(initialState, action))
      .toEqual(expected);
  });

  it(`Reducer should set reviews correctly`, () => {

    const action = {
      type: SET_REVIEWS,
      payload: [{
        "comment": `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
        "date": `2019-05-08T14:13:56.569Z`,
        "id": 1,
        "rating": 4,
        "user": {
          "avatar_url": `./img/avatar-max.jpg`,
          "id": 4,
          "is_pro": false,
          "name": `Max`
        }
      }]
    };

    const expected = {
      current: {},
      reviews: [{
        "comment": `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
        "date": `2019-05-08T14:13:56.569Z`,
        "id": 1,
        "rating": 4,
        "user": {
          "avatar_url": `./img/avatar-max.jpg`,
          "id": 4,
          "is_pro": false,
          "name": `Max`
        }
      }],
      nearest: [],
      status: LoadStatus.INITIAL,
    };

    expect(currentOfferReducer(initialState, action))
      .toEqual(expected);
  });
});
