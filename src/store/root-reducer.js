import {combineReducers} from "redux";
import ReducerNames from './reducer-names';
import offers from './offers/reducer';
import cities from './cities/reducer';
import offerLocation from './offer-location/reducer';
import user from './user/reducer';

export default combineReducers({
  [ReducerNames.OFFERS]: offers,
  [ReducerNames.USER]: user,
  [ReducerNames.CITIES]: cities,
  [ReducerNames.OFFER_LOCATION]: offerLocation,
});
