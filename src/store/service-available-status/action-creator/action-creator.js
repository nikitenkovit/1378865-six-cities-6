import {CHANGE_SERVICE_AVAILABLE_STATUS} from "../action-types";

export default {
  changeServiceAvailableStatus: (status) => ({
    type: CHANGE_SERVICE_AVAILABLE_STATUS,
    payload: status,
  })
};
