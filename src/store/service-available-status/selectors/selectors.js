import {ServiceAvailableStatus} from "../../../const";
import {createSelector} from "reselect";
import NameSpace from "../../name-space";

export const getStatus = (state) => state[NameSpace.SERVICE_AVAILABLE_STATUS].status;

export const getIsNeedShowServiceUnavailableScreen = createSelector(
    getStatus,
    (status) => status === ServiceAvailableStatus.UNAVAILABLE);
