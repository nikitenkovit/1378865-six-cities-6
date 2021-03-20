import RedirectActionCreator from "../../middlewares/action-creator/action-creator";
import {AppRoute} from "../../../const";
import {adaptOfferData} from "../../offers/selectors/selectors";
import {batch} from "react-redux";
import OffersActionCreator from "../../offers/action-creator/action-creator";
import CurrentOfferActionCreator from "../../current-offer/action-creator/action-creator";
import {fetchFavoriteOffers} from "../fetch-favorite-offers/fetch-favorite-offers";

export const sendFavoriteStatus = (id, status) => async (dispatch, _getState, api) => {
  let sendStatus;

  try {
    sendStatus = await api.post(`/favorite/${id}/${status ? 0 : 1}`);
  } catch (e) {
    dispatch(RedirectActionCreator.redirectToRoute(AppRoute.LOGIN));
    return;
  }

  const offer = adaptOfferData(sendStatus.data);

  batch(() => {
    dispatch(OffersActionCreator.updateOffers(offer));
    dispatch(CurrentOfferActionCreator.setCurrentOffer(offer));
    dispatch(fetchFavoriteOffers());
  });
};
