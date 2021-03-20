import MockAdapter from 'axios-mock-adapter';
import {createAPI} from "../../../api";
import {sendComment} from "./send-comment";
import {adaptCommentsData} from "../../current-offer/selectors/selectors";
import {SendStatus} from "../../../const";
import {SET_REVIEWS} from "../../current-offer/action-types";
import {CHANGE_COMMENT_STATUS} from "../../comment-status/action-types";

const mockComments = [{
  "comment": `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
  "date": `2019-05-08T14:13:56.569Z`,
  "id": 1,
  "rating": 4,
  "user": {
    "avatar_url": `test`,
    "id": 4,
    "is_pro": false,
    "name": `test`
  }
}];

describe(`Should sendComment work correctly`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockId = 1;
  const SUCCESS_STATUS = 200;
  const FAILURE_STATUS = 400;
  const URL = `/comments/${mockId}`;
  const dispatch = jest.fn();
  const _getState = jest.fn();
  const api = createAPI(() => jest.fn());
  const apiMock = new MockAdapter(api);
  const postComment = sendComment(mockId);
  const commentsData = mockComments;
  const adaptedComments = mockComments.map(adaptCommentsData);

  it(`Should sendComment work correctly when status is successful`, () => {
    apiMock
      .onPost(URL)
      .reply(SUCCESS_STATUS, commentsData);

    return postComment(dispatch, _getState, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: CHANGE_COMMENT_STATUS,
          payload: SendStatus.SENDING,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: SET_REVIEWS,
          payload: adaptedComments,
        });

        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: CHANGE_COMMENT_STATUS,
          payload: SendStatus.SUCCESS,
        });
      });
  });

  it(`Should sendComment work correctly when status is failure`, () => {
    apiMock
      .onPost(URL)
      .reply(FAILURE_STATUS);

    return postComment(dispatch, _getState, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: CHANGE_COMMENT_STATUS,
          payload: SendStatus.SENDING,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: CHANGE_COMMENT_STATUS,
          payload: SendStatus.FAILURE,
        });
      });
  });
});
