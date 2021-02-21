import offersData from '../mocks/offersData';

import {DEFAULT_CURRENT_CITY} from "../const";

export const getRatingStarValue = (number) => {
  return Math.round(number) * 20 + `%`;
};

export const adaptOfferData = (data) => ({
  bedrooms: data.bedrooms,
  city: data.city,
  description: data.description,
  goods: data.goods,
  host: {
    avatarUrl: data.host.avatar_url,
    id: data.host.id,
    isPro: data.host.is_pro,
    name: data.host.name,
  },
  id: data.id,
  images: data.images,
  isFavorite: data.is_favorite,
  isPremium: data.is_premium,
  location: data.location,
  maxAdults: data.max_adults,
  previewImage: data.preview_image,
  price: data.price,
  rating: data.rating,
  title: data.title,
  type: data.type,
});

export const adaptCommentsData = (data) => ({
  comment: data.comment,
  date: data.date,
  id: data.id,
  rating: data.rating,
  user: {
    avatarUrl: data.user.avatar_url,
    id: data.user.id,
    isPro: data.user.is_pro,
    name: data.user.name,
  }
});

export const getOffers = () => offersData.map(adaptOfferData); // временно. пока нет api

export const getOffersByCity = (city) => {
  return getOffers().filter((offer) => offer.city.name === city.name);
};

export const getCurrentCity = (state) => {
  if (state && state.CITY.city) {
    return state.CITY.city;
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
