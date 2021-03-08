import {combineReducers} from "redux";
import NameSpace from './name-space';
import offers from './offers/reducer';
import cities from './cities/reducer';
import offerLocation from './offer-location/reducer';
import user from './user/reducer';
import currentOffer from './current-offer/reducer';
import comment from './comment-status/reducer';
import favorites from './favorites/reducer';

export default combineReducers({
  [NameSpace.OFFERS]: offers,
  [NameSpace.USER]: user,
  [NameSpace.CITIES]: cities,
  [NameSpace.OFFER_LOCATION]: offerLocation,
  [NameSpace.CURRENT_OFFER]: currentOffer,
  [NameSpace.COMMENT]: comment,
  [NameSpace.FAVORITES]: favorites
});
