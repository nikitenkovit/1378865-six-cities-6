import {SET_FAVORITE_OFFERS, CHANGE_LOAD_FAVORITES_STATUS} from "../action-types";

export default {
  setFavoriteOffers: (offers) => ({
    type: SET_FAVORITE_OFFERS,
    payload: offers
  }),
  changeLoadFavoritesStatus: (status) => ({
    type: CHANGE_LOAD_FAVORITES_STATUS,
    payload: status
  })
};
