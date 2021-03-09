import {SendStatus} from "../../const";
import {createSelector} from "reselect";


export const getStatus = (state) => state.COMMENT.status;

export const getIsNeedDisableForm = (state) => {
  return createSelector(
      getStatus,
      (status) => status === SendStatus.SENDING
  )(state);
};

export const getIsNeedToClearForm = (state) => {
  return createSelector(
      getStatus,
      (status) => status === SendStatus.SUCCESS
  )(state);
};

export const getIsNeedShowError = (state) => {
  return createSelector(
      getStatus,
      (status) => status === SendStatus.FAILURE
  )(state);
};

