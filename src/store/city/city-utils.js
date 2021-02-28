import {DEFAULT_CURRENT_CITY} from "../../const";

export const getCities = (state) => {
  let data = [];

  if (state.hasOwnProperty(`OFFERS`)) {
    data = state.OFFERS.offers;
  } else {
    data = state;
  }

  let cities = data.slice()
    .reduce((generalOffer, offer) => {
      if (!generalOffer.hasOwnProperty(offer.city.name)) {
        generalOffer[offer.city.name] = {...offer.city};
      }

      return generalOffer;
    }, {});

  return Object.values(cities);
};

export const getCurrentCity = (state) => state.CITY;

export const setDefaultCurrentCity = (data) => {
  return getCities(data).find((city) => city.name === DEFAULT_CURRENT_CITY);
};
