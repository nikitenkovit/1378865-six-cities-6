import {SendStatus} from "../../const";

export const getStatus = (state) => state.COMMENT.status;

export const getIsNeedDisableForm = (state) => state.COMMENT.status === SendStatus.SENDING;

export const getIsNeedToClearForm = (state) => state.COMMENT.status === SendStatus.SUCCESS;

export const getIsNeedShowError = (state) => state.COMMENT.status === SendStatus.FAILURE;
