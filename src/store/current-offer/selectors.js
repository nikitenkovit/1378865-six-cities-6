import {LoadStatus} from "../../const";

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

export const getIsNeedShowSpiner = (state) => state.CURRENT_OFFER.status === LoadStatus.INITIAL
  || state.CURRENT_OFFER.status === LoadStatus.FETCHING;

export const getIsNeedShowNotFoundScreen = (state) => state.CURRENT_OFFER.status === LoadStatus.FAILURE;

export const getCurrentOffer = (state) => state.CURRENT_OFFER.current;

export const getOfferId = (props) => props.match.params.id;

export const getNearestOffers = (state) => state.CURRENT_OFFER.nearest;

export const getReviews = (state) => state.CURRENT_OFFER.reviews;
