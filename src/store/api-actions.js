import OffersActionCreator from './offers/action-creator';
import UserActionCreator from './user/ation-creator';
import {AuthorizationStatus, DEFAULT_CURRENT_CITY, LoadStatus} from "../const";
import CityActionCreator from './cities/action-creator';
import {adaptOfferData} from "./offers/offers-utils";
import {adaptUserData} from "./user/selectors";
import {adaptCommentsData} from "./current-offer/selectors";
import RedirectActionCreator from '../store/middlewares/action-creator';
import CurrentOfferActionCreator from './current-offer/action-creator';

const setDefaultCurrentCity = (data) => {
  return data.find((city) => city.name === DEFAULT_CURRENT_CITY);
};

export const fetchOfferList = () => (dispatch, _getState, api) => {
  dispatch(OffersActionCreator.changeStatus(LoadStatus.FETCHING));

  api.get(`/hotels`)
    .then(({data}) => {
      const offers = data.map(adaptOfferData);

      dispatch(OffersActionCreator.setOffers(offers));

      return offers;
    })
    .then((offers) => {
      let swap = offers.slice()
        .reduce((generalOffer, offer) => {
          if (!generalOffer.hasOwnProperty(offer.city.name)) {
            generalOffer[offer.city.name] = {...offer.city};
          }

          return generalOffer;
        }, {});

      const cities = Object.values(swap);

      dispatch(CityActionCreator.setCitiesItems(cities));

      return cities;
    })
    .then((cities) => {
      dispatch(CityActionCreator.changeCity(setDefaultCurrentCity(cities)));

      dispatch(OffersActionCreator.changeStatus(LoadStatus.SUCCESS));
    })
    .catch(() => {
      dispatch(OffersActionCreator.changeStatus(LoadStatus.FAILURE));
    });
};

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(`/login`)
    .then(() => {
      dispatch(UserActionCreator.requiredAuthorization(AuthorizationStatus.AUTH));
    })
    .catch(() => {})
);

export const login = (email, password) => (dispatch, _getState, api) => (
  api.post(`/login`, {email, password})
  .then(({data}) => {
    const user = adaptUserData(data);

    dispatch(UserActionCreator.setUser(user));
    dispatch(UserActionCreator.requiredAuthorization(AuthorizationStatus.AUTH));
  })
    .then(() => dispatch(RedirectActionCreator.redirectToRoute(`/`)))
  .catch(() => {})
);

export const logout = () => (dispatch, _getState, api) => (
  api.get(`/logout`)
    .then(() => {
      dispatch(UserActionCreator.setUser(null));
      dispatch(UserActionCreator.requiredAuthorization(AuthorizationStatus.NO_AUTH));
    })
    .then(() => dispatch(RedirectActionCreator.redirectToRoute(`/login`)))
);

export const fetchCurrentOffer = (id) => (dispatch, _getState, api) => {
  dispatch(CurrentOfferActionCreator.changeCurrentOfferStatus(LoadStatus.FETCHING));

  api.get(`/hotels/${id}`)
    .then(({data}) => {
      const offer = adaptOfferData(data);

      dispatch(CurrentOfferActionCreator.setCurrentOffer(offer));
    })
    .then(() => {
      api.get(`/hotels/${id}/nearby`)
        .then(({data}) => {
          const offers = data.map(adaptOfferData);

          dispatch(CurrentOfferActionCreator.setNearestOffers(offers));
        });
    })
    .then(() => {
      api.get(`/comments/${id}`)
        .then(({data}) => {
          const reviews = data.map(adaptCommentsData);

          dispatch(CurrentOfferActionCreator.setReviews(reviews));

          dispatch(CurrentOfferActionCreator.changeCurrentOfferStatus(LoadStatus.SUCCESS));
        });
    })
    .catch(() => {
      dispatch(CurrentOfferActionCreator.changeCurrentOfferStatus(LoadStatus.FAILURE));
    });
};

export const sendComment = (id, comment, rating) => (dispatch, _getState, api) => (
  api.post(`/comments/${id}`, {comment, rating})
    .then(({data}) => {
      console.log(data)
      const reviews = data.map(adaptCommentsData);

      dispatch(CurrentOfferActionCreator.setReviews(reviews));
    })
    .catch(() => {})
);
