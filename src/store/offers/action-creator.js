import {SET_OFFERS, CHANGE_STATUS} from "./action-types";

export default {
  setOffers: (offers) => ({
    type: SET_OFFERS,
    payload: offers,
  }),
  changeStatus: (status) => ({
    type: CHANGE_STATUS,
    payload: status
  })
};
