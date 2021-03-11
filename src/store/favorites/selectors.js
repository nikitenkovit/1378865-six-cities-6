import {createSelector} from "reselect";
import {LoadStatus} from "../../const";
import NameSpace from "../name-space";

const getStatus = (state) => state[NameSpace.FAVORITES].status;
const getOffers = (state) => state[NameSpace.FAVORITES].items;

export const getIsNeedShowSpiner = createSelector(
    getStatus,
    (status) => status === LoadStatus.INITIAL || status === LoadStatus.FETCHING);

export const getIsNeedShowEmptyScreen = createSelector(
    getOffers,
    (offers) => offers.length < 1);

export const getFavoriteOffers = (state) => state[NameSpace.FAVORITES].items;
