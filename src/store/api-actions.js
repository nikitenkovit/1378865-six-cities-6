import OffersActionCreator from './offers/action-creator';
import UserActionCreator from './user/ation-creator';
import {AuthorizationStatus, DEFAULT_CURRENT_CITY, LoadStatus} from "../const";
import CityActionCreator from './cities/action-creator';
import {adaptOfferData} from "./offers/offers-utils";
import {adaptUserData} from "./user/selectors";
import history from "../history";

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
  .then((response) => {
    const user = adaptUserData(response.data);
    dispatch(UserActionCreator.setUser(user));
    dispatch(UserActionCreator.requiredAuthorization(AuthorizationStatus.AUTH));
    history.push(`/`);
  })
  .catch(() => {})
);
