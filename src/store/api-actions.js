import OffersActionCreator from './offers/action-creator/action-creator';
import UserActionCreator from './user/action-creator/action-creator';
import CityActionCreator from './cities/action-creator/action-creator';
import RedirectActionCreator from './middlewares/action-creator/action-creator';
import CurrentOfferActionCreator from './current-offer/action-creator/action-creator';
import CommentActionCreator from './comment-status/action-creator/action-creator';
import FavoritesActionCreator from './favorites/action-creator/action-creator';
import {AuthorizationStatus, DEFAULT_CURRENT_CITY, LoadStatus, SendStatus, AppRoute} from "../const";
import {adaptOfferData} from "./offers/selectors";
import {adaptUserData} from "./user/selectors";
import {adaptCommentsData} from "./current-offer/selectors";
import {batch} from 'react-redux';

const setDefaultCurrentCity = (data) => {
  return data.find((city) => city.name === DEFAULT_CURRENT_CITY.name);
};

export const fetchOfferList = () => async (dispatch, _getState, api) => {
  dispatch(OffersActionCreator.changeStatus(LoadStatus.FETCHING));

  let fetchOffers;

  try {
    fetchOffers = await api.get(`/hotels`);
  } catch (error) {
    dispatch(OffersActionCreator.changeStatus(LoadStatus.FAILURE));
    return;
  }

  const adaptOffers = await fetchOffers.data.map(adaptOfferData);

  const cities = await adaptOffers.slice()
      .reduce((generalOffer, offer) => {
        if (!generalOffer.hasOwnProperty(offer.city.name)) {
          generalOffer[offer.city.name] = {...offer.city};
        }

        return generalOffer;
      }, {});

  const citiesList = await Object.values(cities);

  batch(() => {
    dispatch(OffersActionCreator.setOffers(adaptOffers));
    dispatch(CityActionCreator.setCitiesItems(citiesList));
    dispatch(CityActionCreator.changeCity(setDefaultCurrentCity(citiesList)));
    dispatch(OffersActionCreator.changeStatus(LoadStatus.SUCCESS));
  });
};

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(`/login`)
    .then(() => {
      dispatch(UserActionCreator.requiredAuthorization(AuthorizationStatus.AUTH));
    })
    .catch(() => {})
);

export const login = (email, password) => async (dispatch, _getState, api) => {
  const sendLogin = await api.post(`/login`, {email, password});

  const user = await adaptUserData(sendLogin.data);

  dispatch(UserActionCreator.setUser(user));
  dispatch(UserActionCreator.requiredAuthorization(AuthorizationStatus.AUTH));

  dispatch(RedirectActionCreator.redirectToRoute(AppRoute.MAIN));
};

export const logout = () => (dispatch, _getState, api) => (
  api.get(`/logout`)
    .then(() => {
      dispatch(UserActionCreator.setUser(null));
      dispatch(UserActionCreator.requiredAuthorization(AuthorizationStatus.NO_AUTH));
    })
    .then(() => dispatch(RedirectActionCreator.redirectToRoute(AppRoute.LOGIN)))
);

export const fetchCurrentOffer = (id) => async (dispatch, _getState, api) => {
  dispatch(CurrentOfferActionCreator.changeCurrentOfferStatus(LoadStatus.FETCHING));

  let fetchOffer;
  let fetchComments;
  let fetchNearestOffers;

  try {
    fetchOffer = await api.get(`/hotels/${id}`);
    fetchComments = await api.get(`/comments/${id}`);
    fetchNearestOffers = await api.get(`/hotels/${id}/nearby`);
  } catch (e) {
    dispatch(CurrentOfferActionCreator.changeCurrentOfferStatus(LoadStatus.FAILURE));
    return;
  }

  const offer = await adaptOfferData(fetchOffer.data);
  const comments = await fetchComments.data.map(adaptCommentsData);
  const nearestOffers = await fetchNearestOffers.data.map(adaptOfferData);

  batch(() => {
    dispatch(CurrentOfferActionCreator.setCurrentOffer(offer));
    dispatch(CurrentOfferActionCreator.setNearestOffers(nearestOffers));
    dispatch(CurrentOfferActionCreator.setReviews(comments));
    dispatch(CurrentOfferActionCreator.changeCurrentOfferStatus(LoadStatus.SUCCESS));
  });
};

export const sendComment = (id, comment, rating) => async (dispatch, _getState, api) => {
  dispatch(CommentActionCreator.changeCommentStatus(SendStatus.SENDING));

  let sendReview;

  try {
    sendReview = await api.post(`/comments/${id}`, {comment, rating});
  } catch (e) {
    dispatch(CommentActionCreator.changeCommentStatus(SendStatus.FAILURE));
    return;
  }

  const adaptedReviews = sendReview.data.map(adaptCommentsData);

  batch(() => {
    dispatch(CurrentOfferActionCreator.setReviews(adaptedReviews));
    dispatch(CommentActionCreator.changeCommentStatus(SendStatus.SUCCESS));
  });
};

export const sendFavoriteStatus = (id, status) => async (dispatch, _getState, api) => {
  let sendStatus;

  try {
    sendStatus = await api.post(`/favorite/${id}/${status ? 0 : 1}`);
  } catch (e) {
    dispatch(RedirectActionCreator.redirectToRoute(AppRoute.LOGIN));
    return;
  }

  const offer = adaptOfferData(sendStatus.data);

  batch(() => {
    dispatch(OffersActionCreator.updateOffers(offer));
    dispatch(CurrentOfferActionCreator.setCurrentOffer(offer));
    dispatch(fetchFavoriteOffers());
  });
};

export const fetchFavoriteOffers = () => async (dispatch, _getState, api) => {
  dispatch(FavoritesActionCreator.changeLoadFavoritesStatus(LoadStatus.FETCHING));

  let fetchOffers;

  try {
    fetchOffers = await api.get(`/favorite`);
  } catch (e) {
    dispatch(RedirectActionCreator.redirectToRoute(AppRoute.LOGIN));
    return;
  }

  const response = fetchOffers.data.map(adaptOfferData);

  const offers = response.reduce((generalOffer, offer) => {
    if (generalOffer.hasOwnProperty(offer.city.name)) {
      generalOffer[offer.city.name].push(offer);
    } else {
      generalOffer[offer.city.name] = [offer];
    }

    return generalOffer;
  }, {});

  batch(() => {
    dispatch(FavoritesActionCreator.setFavoriteOffers(Object.entries(offers)));
    dispatch(FavoritesActionCreator.changeLoadFavoritesStatus(LoadStatus.SUCCESS));
  });
};
