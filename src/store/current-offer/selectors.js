import {LoadStatus} from "../../const";
import {createSelector} from "reselect";

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

const getStatus = (state) => state.CURRENT_OFFER.status;

export const getIsNeedShowSpiner = (state) => {
  return createSelector(
      getStatus,
      (status) => status === LoadStatus.INITIAL || status === LoadStatus.FETCHING)(state);
};

export const getIsNeedShowNotFoundScreen = (state) => {
  return createSelector(
      getStatus,
      (status) => status === LoadStatus.FAILURE)(state);
};

export const getCurrentOffer = (state) => state.CURRENT_OFFER.current;

export const getOfferId = (props) => props.match.params.id;

export const getNearestOffers = (state) => state.CURRENT_OFFER.nearest;

export const getReviews = (state) => state.CURRENT_OFFER.reviews;
