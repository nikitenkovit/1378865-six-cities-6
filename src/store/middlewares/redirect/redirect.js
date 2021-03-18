import browserHistory from "../../../history";
import {REDIRECT_TO_ROUTE} from "../action-types";

export const redirect = (_store) => (next) => (action) => {
  if (action.type === REDIRECT_TO_ROUTE) {
    browserHistory.push(action.payload);
  }

  return next(action);
};
