import {CHANGE_SERVICE_AVAILABLE_STATUS} from "../action-types";
import {ServiceAvailableStatus} from "../../../const";

const initialState = {
  status: ServiceAvailableStatus.AVAILABLE,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_SERVICE_AVAILABLE_STATUS:
      return {
        status: action.payload
      };
    default:
      return state;
  }
};
