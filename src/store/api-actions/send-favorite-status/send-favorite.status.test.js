import MockAdapter from 'axios-mock-adapter';
import {createAPI} from "../../../api";
import {sendFavoriteStatus} from "./send-favorite-status";
import {adaptOfferData} from "../../offers/selectors/selectors";
import {UPDATE_OFFERS} from "../../offers/action-types";
import {SET_CURRENT_OFFER} from "../../current-offer/action-types";
import {REDIRECT_TO_ROUTE} from "../../middlewares/action-types";
import {AppRoute} from "../../../const";

const MockOffer = {
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

describe(`Should sendFavoriteStatus work correctly`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockId = 1;
  const mockStatus = 0;
  const mockBoolStatus = true;
  const SUCCESS_STATUS = 200;
  const FAILURE_STATUS = 404;
  const URL = `/favorite/${mockId}/${mockStatus}`;
  const dispatch = jest.fn();
  const _getState = jest.fn();
  const api = createAPI(() => jest.fn());
  const apiMock = new MockAdapter(api);
  const postFavoriteStatus = sendFavoriteStatus(mockId, mockBoolStatus);
  const offerData = MockOffer;
  const adaptedOffer = adaptOfferData(MockOffer);

  it(`sendFavoriteStatus work correctly when status is successful`, () => {
    apiMock
      .onPost(URL)
      .reply(SUCCESS_STATUS, offerData);

    return postFavoriteStatus(dispatch, _getState, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: UPDATE_OFFERS,
          payload: adaptedOffer,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: SET_CURRENT_OFFER,
          payload: adaptedOffer,
        });
      });
  });

  it(`sendFavoriteStatus work correctly when status is failure`, () => {
    apiMock
      .onPost(URL)
      .reply(FAILURE_STATUS);

    return postFavoriteStatus(dispatch, _getState, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: REDIRECT_TO_ROUTE,
          payload: AppRoute.LOGIN,
        });
      });
  });
});
