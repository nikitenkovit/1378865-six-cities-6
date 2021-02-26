import {LOAD_OFFERS} from "./action-types";

export default {
  loadOffers: (offers) => ({
    type: LOAD_OFFERS,
    payload: offers
  }),
};
