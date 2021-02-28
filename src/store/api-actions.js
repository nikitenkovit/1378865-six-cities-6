import OffersActionCreator from './offers/action-creator';
import UserActionCreator from './user/ation-creator';
import {AuthorizationStatus, LoadStatus} from "../const";
import CityActionCreator from './city/action-creator';
import {setDefaultCurrentCity} from "./city/city-utils";
import {adaptOfferData} from "./offers/offers-utils";

export const fetchOfferList = () => (dispatch, _getState, api) => {
  dispatch(OffersActionCreator.changeStatus(LoadStatus.FETCHING));

  api.get(`/hotels`)
    .then(({data}) => {
      const offers = data.map(adaptOfferData);

      dispatch(OffersActionCreator.setOffers(offers));
      dispatch(OffersActionCreator.changeStatus(LoadStatus.SUCCESS));

      return offers;
    })
    .then((offers) => {
      dispatch(CityActionCreator.changeCity(setDefaultCurrentCity(offers)));
    })
    .catch(() => {
      dispatch(OffersActionCreator.changeStatus(LoadStatus.FAILURE));
    });
};

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(`/login`)
    .then(() => dispatch(UserActionCreator.requiredAuthorization(AuthorizationStatus.AUTH)))
    .catch(() => {})
);
