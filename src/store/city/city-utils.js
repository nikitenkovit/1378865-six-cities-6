import {DEFAULT_CURRENT_CITY} from "../../const";

export const getCities = (data) => {
  let cities = data.slice()
    .reduce((generalOffer, offer) => {
      if (!generalOffer.hasOwnProperty(offer.city.name)) {
        generalOffer[offer.city.name] = {...offer.city};
      }

      return generalOffer;
    }, {});

  return Object.values(cities);
};

export const getCurrentCity = (data, state) => {
  if (state && state.CITY) {
    return state.CITY;
  }
  return getCities(data)
    .find((city) => city.name === DEFAULT_CURRENT_CITY);
};
