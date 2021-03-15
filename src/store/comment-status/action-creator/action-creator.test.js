import {CHANGE_COMMENT_STATUS} from "../action-types";
import ActionCreator from "./action-creator";
import {SendStatus} from "../../../const";


it(`Action creator change comment status returns correct action`, () => {
  const status = SendStatus.SUCCESS;

  const expected = {
    type: CHANGE_COMMENT_STATUS,
    payload: status
  };

  expect(ActionCreator.changeCommentStatus(status)).toEqual(expected);
});
