import {CHANGE_COMMENT_STATUS} from "../action-types";
import {SendStatus} from "../../../const";

const initialState = {
  status: SendStatus.INITIAL
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_COMMENT_STATUS:
      return {
        ...state,
        status: action.payload
      };
    default:
      return state;
  }
};
