import CommentActionCreator from "../../comment-status/action-creator/action-creator";
import {SendStatus} from "../../../const";
import {adaptCommentsData} from "../../current-offer/selectors/selectors";
import {batch} from "react-redux";
import CurrentOfferActionCreator from "../../current-offer/action-creator/action-creator";

export const sendComment = (id, comment, rating) => async (dispatch, _getState, api) => {
  dispatch(CommentActionCreator.changeCommentStatus(SendStatus.SENDING));

  let sendReview;

  try {
    sendReview = await api.post(`/comments/${id}`, {comment, rating});
  } catch (e) {
    dispatch(CommentActionCreator.changeCommentStatus(SendStatus.FAILURE));
    return;
  }

  const adaptedReviews = sendReview.data.map(adaptCommentsData);

  batch(() => {
    dispatch(CurrentOfferActionCreator.setReviews(adaptedReviews));
    dispatch(CommentActionCreator.changeCommentStatus(SendStatus.SUCCESS));
  });
};
