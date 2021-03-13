import {CHANGE_CURRENT_OFFER_STATUS, SET_CURRENT_OFFER,
  SET_NEAREST_OFFERS, SET_REVIEWS} from "../action-types";
import ActionCreator from "./action-creator";
import {SendStatus} from "../../../const";
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

describe(`Current offer action creators work correctly`, () => {
  it(`Action creator change current offer status returns correct action`, () => {
    const status = SendStatus.SUCCESS;

    const expected = {
      type: CHANGE_CURRENT_OFFER_STATUS,
      payload: status
    };

    expect(ActionCreator.changeCurrentOfferStatus(status)).toEqual(expected);
  });

  it(`Action creator set current offer returns correct action`, () => {
    const current = offer;

    const expected = {
      type: SET_CURRENT_OFFER,
      payload: current
    };

    expect(ActionCreator.setCurrentOffer(current)).toEqual(expected);
  });

  it(`Action creator set nearest offers returns correct action`, () => {
    const nearest = [offer, offer, offer];

    const expected = {
      type: SET_NEAREST_OFFERS,
      payload: nearest
    };

    expect(ActionCreator.setNearestOffers(nearest)).toEqual(expected);
  });

  it(`Action creator set reviews returns correct action`, () => {
    const reviews = [{
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
    }];

    const expected = {
      type: SET_REVIEWS,
      payload: reviews
    };

    expect(ActionCreator.setReviews(reviews)).toEqual(expected);
  });
});
