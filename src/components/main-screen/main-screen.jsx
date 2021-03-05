import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import Header from "../header/header";
import Cities from "../cities/cities";
import OffersList from "../offers-list/offers-list";
import OfferSorting from "../offer-sorting/offer-sorting";
import Map from "../map/map";
import SpinerScreen from "../spiner-screen/spiner-screen";
import ServiceIsUnavailableScreen from "../service-is-unavailable-screen/service-is-unavailable-screen";
import {DEFAULT_SORTING_TYPE, OffersListClassName} from "../../const";
import {sortingFunction} from "../../store/offers/selectors";
import {getCurrentCity} from "../../store/cities/selectors";
import {getOffersByCity, getIsNeedShowSpiner, getIsNeedShowError} from "../../store/offers/selectors";

const MainScreen = () => {
  const needShowSpinner = useSelector(getIsNeedShowSpiner);
  const needShowError = useSelector(getIsNeedShowError);
  const currentCity = useSelector(getCurrentCity);
  const offers = useSelector(getOffersByCity);

  const [activeType, setActiveType] = useState(DEFAULT_SORTING_TYPE);
  const [sortedOffers, setSortedOffers] = useState(offers);

  useEffect(() => {
    setSortedOffers(offers.sort(sortingFunction(offers, activeType)));
  }, [activeType, currentCity]);

  if (needShowSpinner) {
    return (
      <SpinerScreen/>
    );
  } else if (needShowError) {
    return (
      <ServiceIsUnavailableScreen/>
    );
  }

  return (
    <div className="page page--gray page--main">
      <Header/>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <Cities/>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {offers.length} places to stay in {currentCity.name}
              </b>
              <OfferSorting activeType={activeType} onSortChange={setActiveType}/>
              <OffersList offers={sortedOffers} offersListClassName={OffersListClassName.CITY_PLACES}/>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map offers={offers}/>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainScreen;
