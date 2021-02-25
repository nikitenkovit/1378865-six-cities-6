import OffersActionCreator from './offers/action-creator';
import UserActionCreator from './user/ation-creator';
import {AuthorizationStatus} from "../const";

export const fetchOfferList = () => (dispatch, _getState, api) => {
  api.get(`/hotels`)
    .then(({data}) => dispatch(OffersActionCreator.loadOffers(data)));
};

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(`/login`)
    .then(() => dispatch(UserActionCreator.requiredAuthorization(AuthorizationStatus.AUTH)))
    .catch(() => {})
);
