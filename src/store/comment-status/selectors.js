import {SendStatus} from "../../const";
import {createSelector} from "reselect";
import NameSpace from '../name-space';

export const getStatus = (state) => state[NameSpace.COMMENT].status;

export const getIsNeedDisableForm = createSelector(
    getStatus,
    (status) => status === SendStatus.SENDING
);

export const getIsNeedToClearForm = createSelector(
    getStatus,
    (status) => status === SendStatus.SUCCESS
);

export const getIsNeedShowError = createSelector(
    getStatus,
    (status) => status === SendStatus.FAILURE
);

