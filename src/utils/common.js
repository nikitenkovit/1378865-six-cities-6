import {PathValue} from "../const";

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

export const getOfferCardClassNames = (pathValue) => {
  let currentClassNames = {};

  switch (pathValue) {
    case (PathValue.MAIN_SCREEN):
      currentClassNames = {
        articleClass: `cities__place-card`,
        wrapperClass: `cities__image-wrapper`,
        infoClass: ``
      };
      break;
    case (PathValue.FAVORITES_SCREEN):
      currentClassNames = {
        articleClass: `favorites__card`,
        wrapperClass: `favorites__image-wrapper`,
        infoClass: `favorites__card-info`
      };
      break;
    case (PathValue.ROOM_SCREEN):
      currentClassNames = {
        articleClass: `near-places__card`,
        wrapperClass: `near-places__image-wrapper`,
        infoClass: ``
      };
      break;
  }

  return currentClassNames;
};
