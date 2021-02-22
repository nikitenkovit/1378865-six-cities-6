import {combineReducers} from "redux";
import ReducerNames from './reducer-names';
import city from './city/reducer';

export default combineReducers({
  [ReducerNames.CITY]: city,
});
