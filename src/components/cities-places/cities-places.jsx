import React, {useEffect, useState} from 'react';
import OfferSorting from "../offer-sorting/offer-sorting";
import OffersList from "../offers-list/offers-list";
import {DEFAULT_SORTING_TYPE, OffersListClassName} from "../../const";
import Map from "../map/map";
import {useSelector} from "react-redux";
import {getCurrentCity} from "../../store/cities/selectors";
import {getOffersByCity} from "../../store/offers/selectors/selectors";
import {sortingFunction} from "../../store/offers/utils";

const CitiesPlaces = () => {
  const currentCity = useSelector(getCurrentCity);
  const offers = useSelector(getOffersByCity);

  const [activeType, setActiveType] = useState(DEFAULT_SORTING_TYPE);
  const [sortedOffers, setSortedOffers] = useState(offers);

  useEffect(() => {
    setSortedOffers(offers.slice().sort(sortingFunction(offers, activeType)));
  }, [offers, activeType, currentCity]);

  return (
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
            <Map offers={offers} cityCenter={currentCity.location}/>
          </section>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CitiesPlaces);
