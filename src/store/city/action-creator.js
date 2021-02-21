import {CHANGE_CITY} from "./action-types";

export default {
  changeCity: (city) => ({
    type: CHANGE_CITY,
    payload: city
  })
};
