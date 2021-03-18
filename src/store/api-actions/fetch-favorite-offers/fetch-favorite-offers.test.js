import MockAdapter from 'axios-mock-adapter';
import {createAPI} from "../../../api";
import {fetchFavoriteOffers} from "./fetch-favorite-offers";
import {adaptOfferData} from "../../offers/selectors/selectors";
import {LoadStatus} from "../../../const";
import {CHANGE_LOAD_FAVORITES_STATUS, SET_FAVORITE_OFFERS} from "../../favorites/action-types";

const MockOffers = {
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

describe(`Should fetchFavoriteOffers work correctly`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const SUCCESS_STATUS = 200;
  const FAILURE_STATUS = 401;
  const URL = `/favorite`;
  const dispatch = jest.fn();
  const _getState = jest.fn();
  const api = createAPI(() => jest.fn());
  const apiMock = new MockAdapter(api);
  const loadFavoriteOffers = fetchFavoriteOffers();
  const data = [MockOffers];
  const adaptedOffer = adaptOfferData(MockOffers);

  it(`Should make a correct API call to /favorite when status is successful`, () => {
    apiMock
      .onGet(URL)
      .reply(SUCCESS_STATUS, data);

    return loadFavoriteOffers(dispatch, _getState, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: CHANGE_LOAD_FAVORITES_STATUS,
          payload: LoadStatus.FETCHING,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: SET_FAVORITE_OFFERS,
          payload: [[adaptedOffer.city.name, [adaptedOffer]]],
        });

        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: CHANGE_LOAD_FAVORITES_STATUS,
          payload: LoadStatus.SUCCESS,
        });
      });
  });

  it(`Should make a correct API call to /favorite when status is failure`, () => {
    apiMock
      .onGet(URL)
      .reply(FAILURE_STATUS);

    return loadFavoriteOffers(dispatch, _getState, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
      });
  });
});
