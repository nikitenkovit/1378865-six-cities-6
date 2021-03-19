import {combineReducers} from "redux";
import NameSpace from './name-space';
import offers from './offers/reducer/reducer';
import cities from './cities/reducer/reducer';
import offerLocation from './offer-location/reducer/reducer';
import user from './user/reducer/reducer';
import currentOffer from './current-offer/reducer/reducer';
import comment from './comment-status/reducer/reducer';
import favorites from './favorites/reducer/reducer';
import serviceAvailableStatus from './service-available-status/reducer/reducer';

export default combineReducers({
  [NameSpace.OFFERS]: offers,
  [NameSpace.USER]: user,
  [NameSpace.CITIES]: cities,
  [NameSpace.OFFER_LOCATION]: offerLocation,
  [NameSpace.CURRENT_OFFER]: currentOffer,
  [NameSpace.COMMENT]: comment,
  [NameSpace.FAVORITES]: favorites,
  [NameSpace.SERVICE_AVAILABLE_STATUS]: serviceAvailableStatus
});
