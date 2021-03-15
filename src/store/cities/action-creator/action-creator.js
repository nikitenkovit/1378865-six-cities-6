import {SET_ITEMS, CHANGE_CITY} from "../action-types";

export default {
  setCitiesItems: (data) => ({
    type: SET_ITEMS,
    payload: data
  }),
  changeCity: (city) => ({
    type: CHANGE_CITY,
    payload: city
  })
};
