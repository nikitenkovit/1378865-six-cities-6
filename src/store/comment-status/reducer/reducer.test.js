import commentStatusReducer from "./reducer";
import {CHANGE_COMMENT_STATUS} from "../action-types";
import {SendStatus} from "../../../const";

const initialState = {
  status: SendStatus.INITIAL
};

describe(`Comment status reducer work correctly`, () => {
  it(`Reducer without parameters should initial state`, () => {

    expect(commentStatusReducer(undefined, {}))
      .toEqual(initialState);
  });

  it(`Reducer should change comment status correctly`, () => {

    const action = {
      type: CHANGE_COMMENT_STATUS,
      payload: SendStatus.SUCCESS
    };

    const expected = {
      status: SendStatus.SUCCESS
    };

    expect(commentStatusReducer(initialState, action))
      .toEqual(expected);
  });
});
