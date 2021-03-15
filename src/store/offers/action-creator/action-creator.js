import {SET_OFFERS, CHANGE_STATUS, UPDATE_OFFERS} from "../action-types";

export default {
  setOffers: (offers) => ({
    type: SET_OFFERS,
    payload: offers,
  }),
  changeStatus: (status) => ({
    type: CHANGE_STATUS,
    payload: status
  }),
  updateOffers: (offer) => ({
    type: UPDATE_OFFERS,
    payload: offer
  })
};
