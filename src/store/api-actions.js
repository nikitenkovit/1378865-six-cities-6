import OffersActionCreator from './offers/action-creator';
import UserActionCreator from './user/ation-creator';
import {AuthorizationStatus} from "../const";
import CityActionCreator from './city/action-creator';
import {getCurrentCity} from "./city/city-utils";
import {adaptOfferData} from "./offers/offers-utils";

export const fetchOfferList = () => (dispatch, _getState, api) => {
  api.get(`/hotels`)
    .then(({data}) => {
      const offers = data.map((offer) => adaptOfferData(offer));
      dispatch(OffersActionCreator.loadOffers(offers));
      return offers;
    }).then((offers) => {
      dispatch(CityActionCreator.changeCity(getCurrentCity(offers)));
    });
};

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(`/login`)
    .then(() => dispatch(UserActionCreator.requiredAuthorization(AuthorizationStatus.AUTH)))
    .catch(() => {})
);
