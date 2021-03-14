import {LoadStatus, SortingType} from "../../const";
import {createSelector} from "reselect";
import NameSpace from "../name-space";

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

const getOffers = (state) => state[NameSpace.OFFERS].items;

const getCurrentCityName = (state) => state[NameSpace.CITIES].current.name;

export const getStatus = (state) => state[NameSpace.OFFERS].status;

export const getOffersByCity = createSelector(
    [getOffers, getCurrentCityName],
    (offers, cityName) => offers.filter((offer) => offer.city.name === cityName));

export const getIsNeedShowSpiner = createSelector(
    getStatus,
    (status) => status === LoadStatus.INITIAL || status === LoadStatus.FETCHING);

export const getIsNeedShowError = createSelector(
    [getStatus, getOffers, getOffersByCity],
    (status, offers, citiOffers) => status === LoadStatus.FAILURE
      || offers.length === 0
      || citiOffers === 0);
