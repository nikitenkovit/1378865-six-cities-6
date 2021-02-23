import {combineReducers} from "redux";
import ReducerNames from './reducer-names';
import city from './city/reducer';
import offerLocation from './offer-location/reducer';

export default combineReducers({
  [ReducerNames.CITY]: city,
  [ReducerNames.OFFER_LOCATION]: offerLocation
});
