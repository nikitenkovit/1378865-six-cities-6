import {REDIRECT_TO_ROUTE} from "./action-types";

export default {
  redirectToRoute: (url) => ({
    type: REDIRECT_TO_ROUTE,
    payload: url
  })
};
