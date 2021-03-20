import MockAdapter from 'axios-mock-adapter';
import {createAPI} from "../../../api";
import {fetchCurrentOffer} from "./fetch-current-offer";
import {adaptOfferData} from "../../offers/selectors/selectors";
import {adaptCommentsData} from "../../current-offer/selectors/selectors";
import {LoadStatus} from "../../../const";
import {CHANGE_CURRENT_OFFER_STATUS,
  SET_CURRENT_OFFER,
  SET_NEAREST_OFFERS,
  SET_REVIEWS} from "../../current-offer/action-types";

const Mock = {
  OFFER: {
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
  },
  COMMENTS: [{
    "comment": `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
    "date": `2019-05-08T14:13:56.569Z`,
    "id": 1,
    "rating": 4,
    "user": {
      "avatar_url": `test`,
      "id": 4,
      "is_pro": false,
      "name": `test`
    }
  }]
};

describe(`Should fetchCurrentOffer work correctly`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockId = 1;
  const SUCCESS_STATUS = 200;
  const FAILURE_STATUS = 404;
  const OFFER_URL = `/hotels/${mockId}`;
  const COMMENTS_URL = `/comments/${mockId}`;
  const NEAREST_OFFERS_URL = `/hotels/${mockId}/nearby`;
  const dispatch = jest.fn();
  const _getState = jest.fn();
  const api = createAPI(() => jest.fn());
  const apiMock = new MockAdapter(api);
  const loadCurrentOffer = fetchCurrentOffer(mockId);
  const offerData = Mock.OFFER;
  const adaptedOffer = adaptOfferData(Mock.OFFER);
  const commentsData = Mock.COMMENTS;
  const adaptedComments = Mock.COMMENTS.map(adaptCommentsData);

  it(`fetchCurrentOffer work correctly when status is successful`, () => {
    apiMock
      .onGet(OFFER_URL)
      .reply(SUCCESS_STATUS, offerData);

    apiMock
      .onGet(COMMENTS_URL)
      .reply(SUCCESS_STATUS, commentsData);

    apiMock
      .onGet(NEAREST_OFFERS_URL)
      .reply(SUCCESS_STATUS, [offerData]);

    return loadCurrentOffer(dispatch, _getState, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(5);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: CHANGE_CURRENT_OFFER_STATUS,
          payload: LoadStatus.FETCHING,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: SET_CURRENT_OFFER,
          payload: adaptedOffer,
        });

        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: SET_NEAREST_OFFERS,
          payload: [adaptedOffer],
        });

        expect(dispatch).toHaveBeenNthCalledWith(4, {
          type: SET_REVIEWS,
          payload: adaptedComments,
        });

        expect(dispatch).toHaveBeenNthCalledWith(5, {
          type: CHANGE_CURRENT_OFFER_STATUS,
          payload: LoadStatus.SUCCESS,
        });
      });
  });

  it(`fetchCurrentOffer work correctly when status is failure`, () => {
    apiMock
      .onGet(OFFER_URL)
      .reply(SUCCESS_STATUS, offerData);

    apiMock
      .onGet(COMMENTS_URL)
      .reply(SUCCESS_STATUS, commentsData);

    apiMock
      .onGet(NEAREST_OFFERS_URL)
      .reply(FAILURE_STATUS);

    return loadCurrentOffer(dispatch, _getState, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: CHANGE_CURRENT_OFFER_STATUS,
          payload: LoadStatus.FETCHING,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: CHANGE_CURRENT_OFFER_STATUS,
          payload: LoadStatus.FAILURE,
        });
      });
  });
});
