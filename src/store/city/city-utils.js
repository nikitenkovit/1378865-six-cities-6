import {DEFAULT_CURRENT_CITY} from "../../const";
import {getOffers} from "../offers/offers-utils";

export const getCurrentCity = (state) => {
  if (state && state.CITY) {
    return state.CITY;
  }
  return getCities()
    .find((city) => city.name === DEFAULT_CURRENT_CITY);
};

export const getCities = (state) => {
  const cities = getOffers(state)
    .reduce((generalOffer, offer) => {
      if (!generalOffer.hasOwnProperty(offer.city.name)) {
        generalOffer[offer.city.name] = {...offer.city};
      }

      return generalOffer;
    }, {});

  return Object.values(cities);
};
