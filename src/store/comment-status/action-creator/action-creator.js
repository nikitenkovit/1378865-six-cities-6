import {CHANGE_COMMENT_STATUS} from "../action-types";

export default {
  changeCommentStatus: (status) => ({
    type: CHANGE_COMMENT_STATUS,
    payload: status
  })
};
