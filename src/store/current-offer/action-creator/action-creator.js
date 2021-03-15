import {CHANGE_CURRENT_OFFER_STATUS, SET_CURRENT_OFFER,
  SET_NEAREST_OFFERS, SET_REVIEWS} from "../action-types";

export default {
  changeCurrentOfferStatus: (status) => ({
    type: CHANGE_CURRENT_OFFER_STATUS,
    payload: status
  }),
  setCurrentOffer: (offer) => ({
    type: SET_CURRENT_OFFER,
    payload: offer
  }),
  setNearestOffers: (offers) => ({
    type: SET_NEAREST_OFFERS,
    payload: offers
  }),
  setReviews: (reviews) => ({
    type: SET_REVIEWS,
    payload: reviews
  })
};
