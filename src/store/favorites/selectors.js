import {createSelector} from "reselect";
import {LoadStatus} from "../../const";
import NameSpace from "../name-space";

const getStatus = (state) => state[NameSpace.FAVORITES].status;
const getOffers = (state) => state[NameSpace.FAVORITES].items;

export const getIsNeedShowSpiner = (state) => {
  return createSelector(
      getStatus,
      (status) => status === LoadStatus.INITIAL || status === LoadStatus.FETCHING)(state);
};

export const getFavoriteOffers = (state) => state[NameSpace.FAVORITES].items;

export const getIsNeedShowEmptyScreen = (state) => {
  return createSelector(
      getOffers,
      (offers) => offers.length < 1)(state);
};
