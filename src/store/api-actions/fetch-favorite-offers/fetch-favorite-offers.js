import FavoritesActionCreator from "../../favorites/action-creator/action-creator";
import {AppRoute, LoadStatus} from "../../../const";
import RedirectActionCreator from "../../middlewares/action-creator/action-creator";
import {adaptOfferData} from "../../offers/selectors/selectors";
import {batch} from "react-redux";

export const fetchFavoriteOffers = () => async (dispatch, _getState, api) => {
  dispatch(FavoritesActionCreator.changeLoadFavoritesStatus(LoadStatus.FETCHING));

  let fetchOffers;

  try {
    fetchOffers = await api.get(`/favorite`);
  } catch (e) {
    dispatch(RedirectActionCreator.redirectToRoute(AppRoute.LOGIN));
    return;
  }

  const response = fetchOffers.data.map(adaptOfferData);

  const offers = response.reduce((generalOffer, offer) => {
    if (generalOffer.hasOwnProperty(offer.city.name)) {
      generalOffer[offer.city.name].push(offer);
    } else {
      generalOffer[offer.city.name] = [offer];
    }

    return generalOffer;
  }, {});

  batch(() => {
    dispatch(FavoritesActionCreator.setFavoriteOffers(Object.entries(offers)));
    dispatch(FavoritesActionCreator.changeLoadFavoritesStatus(LoadStatus.SUCCESS));
  });
};
