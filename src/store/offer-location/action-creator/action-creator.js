import {CHANGE_OFFER_LOCATION} from "../action-types";

export default {
  changeOfferLocation: (location) => ({
    type: CHANGE_OFFER_LOCATION,
    payload: location
  })
};
