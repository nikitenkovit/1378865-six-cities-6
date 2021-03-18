import MockAdapter from 'axios-mock-adapter';
import {createAPI} from "../../../api";
import {fetchOfferList} from "./fetch-offer-list";
import {CHANGE_STATUS, SET_OFFERS} from "../../offers/action-types";
import {SET_ITEMS, CHANGE_CITY} from "../../cities/action-types";
import {LoadStatus} from "../../../const";
import {adaptOfferData} from "../../offers/selectors/selectors";

const mockOffer = {
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

describe(`fetchOfferList work correctly`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const adaptedOffer = adaptOfferData(mockOffer);
  const SUCCESS_STATUS = 200;
  const FAILURE_STATUS = 404;
  const OFFERS_URL = `/hotels`;
  const dispatch = jest.fn();
  const _getState = jest.fn();
  const api = createAPI(() => jest.fn());
  const apiMock = new MockAdapter(api);
  const loadOffers = fetchOfferList();
  const data = [mockOffer];

  it(`Should make a correct API call to /hotels when status is successful`, () => {
    apiMock
      .onGet(OFFERS_URL)
      .reply(SUCCESS_STATUS, data);

    return loadOffers(dispatch, _getState, api)
      .then(() => {
        const {city} = adaptedOffer;

        expect(dispatch).toHaveBeenCalledTimes(5);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: CHANGE_STATUS,
          payload: LoadStatus.FETCHING,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: SET_OFFERS,
          payload: [adaptedOffer]
        });

        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: SET_ITEMS,
          payload: [city],
        });

        expect(dispatch).toHaveBeenNthCalledWith(4, {
          type: CHANGE_CITY,
          payload: city,
        });

        expect(dispatch).toHaveBeenNthCalledWith(5, {
          type: CHANGE_STATUS,
          payload: LoadStatus.SUCCESS,
        });
      });
  });

  it(`Should make a correct API call to /hotels when status is failure`, () => {
    apiMock
      .onGet(OFFERS_URL)
      .reply(FAILURE_STATUS);

    return loadOffers(dispatch, _getState, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: CHANGE_STATUS,
          payload: LoadStatus.FETCHING,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: CHANGE_STATUS,
          payload: LoadStatus.FAILURE,
        });
      });
  });
});

