import CurrentOfferActionCreator from "../../current-offer/action-creator/action-creator";
import {LoadStatus} from "../../../const";
import {adaptOfferData} from "../../offers/selectors/selectors";
import {adaptCommentsData} from "../../current-offer/selectors/selectors";
import {batch} from "react-redux";

export const fetchCurrentOffer = (id) => async (dispatch, _getState, api) => {
  dispatch(CurrentOfferActionCreator.changeCurrentOfferStatus(LoadStatus.FETCHING));

  let fetchOffer;
  let fetchComments;
  let fetchNearestOffers;

  try {
    fetchOffer = await api.get(`/hotels/${id}`);
    fetchComments = await api.get(`/comments/${id}`);
    fetchNearestOffers = await api.get(`/hotels/${id}/nearby`);
  } catch (e) {
    dispatch(CurrentOfferActionCreator.changeCurrentOfferStatus(LoadStatus.FAILURE));
    return;
  }

  const offer = await adaptOfferData(fetchOffer.data);
  const comments = await fetchComments.data.map(adaptCommentsData);
  const nearestOffers = await fetchNearestOffers.data.map(adaptOfferData);

  batch(() => {
    dispatch(CurrentOfferActionCreator.setCurrentOffer(offer));
    dispatch(CurrentOfferActionCreator.setNearestOffers(nearestOffers));
    dispatch(CurrentOfferActionCreator.setReviews(comments));
    dispatch(CurrentOfferActionCreator.changeCurrentOfferStatus(LoadStatus.SUCCESS));
  });
};
