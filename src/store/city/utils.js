import {DEFAULT_CURRENT_CITY} from "../../const";
import {getOffers} from "../../utils/common";

export const getCurrentCity = (state) => {
  if (state && state.CITY) {
    return state.CITY;
  }
  return getCities()
    .find((city) => city.name === DEFAULT_CURRENT_CITY);
};

export const getCities = () => {
  const cities = getOffers()
    .reduce((generalOffer, offer) => {
      if (!generalOffer.hasOwnProperty(offer.city.name)) {
        generalOffer[offer.city.name] = {...offer.city};
      }

      return generalOffer;
    }, {});

  return Object.values(cities);
};
