import OffersActionCreator from "../../offers/action-creator/action-creator";
import {DEFAULT_CURRENT_CITY, LoadStatus} from "../../../const";
import {adaptOfferData} from "../../offers/selectors/selectors";
import {batch} from "react-redux";
import CityActionCreator from "../../cities/action-creator/action-creator";

const setDefaultCurrentCity = (data) => {
  return data.find((city) => {
    if (city.name === DEFAULT_CURRENT_CITY.name) {
      return city;
    }
    return city.name;
  });
};

export const fetchOfferList = () => async (dispatch, _getState, api) => {
  dispatch(OffersActionCreator.changeStatus(LoadStatus.FETCHING));

  let fetchOffers;

  try {
    fetchOffers = await api.get(`/hotels`);
  } catch (error) {
    dispatch(OffersActionCreator.changeStatus(LoadStatus.FAILURE));
    return;
  }

  const adaptOffers = await fetchOffers.data.map(adaptOfferData);

  const cities = await adaptOffers.slice()
    .reduce((generalOffer, offer) => {
      if (!generalOffer.hasOwnProperty(offer.city.name)) {
        generalOffer[offer.city.name] = {...offer.city};
      }

      return generalOffer;
    }, {});

  const citiesList = await Object.values(cities);

  batch(() => {
    dispatch(OffersActionCreator.setOffers(adaptOffers));
    dispatch(CityActionCreator.setCitiesItems(citiesList));
    dispatch(CityActionCreator.changeCity(setDefaultCurrentCity(citiesList)));
    dispatch(OffersActionCreator.changeStatus(LoadStatus.SUCCESS));
  });
};
