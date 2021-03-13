import {SET_FAVORITE_OFFERS, CHANGE_LOAD_FAVORITES_STATUS} from "../action-types";
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

describe(`Favorites action creators work correctly`, () => {
  it(`Action creator set favorite offers returns correct action`, () => {
    const items = [offer, offer, offer];

    const expected = {
      type: SET_FAVORITE_OFFERS,
      payload: items
    };

    expect(ActionCreator.setFavoriteOffers(items)).toEqual(expected);
  });

  it(`Action creator change load favorites status returns correct action`, () => {
    const status = SendStatus.SUCCESS;

    const expected = {
      type: CHANGE_LOAD_FAVORITES_STATUS,
      payload: status
    };

    expect(ActionCreator.changeLoadFavoritesStatus(status)).toEqual(expected);
  });
});
