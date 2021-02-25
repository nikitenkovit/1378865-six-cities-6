import offersData from '../mocks/offersData';
import {SortingType} from "../const";

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

export const getOffersByCity = (state) => {
  return getOffers().filter((offer) => offer.city.name === state.CITY.name);
};

export const sortingFunction = (offers, type) => (a, b) => {
  switch (type) {
    case SortingType.HIGH_TO_LOW:
      return b.price - a.price;
    case SortingType.LOW_TO_HIGH:
      return a.price - b.price;
    case SortingType.TOP_RATED:
      return b.rating - a.rating;
  }
  return offers;
};
