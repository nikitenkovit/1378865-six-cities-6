import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import OffersList from "../offers-list/offers-list";
import Map from "../map/map";
import roomOfferProp from '../room-screen/room-screen.prop';
import {DEFAULT_SORTING_TYPE, LoadStatus, OffersListClassName} from "../../const";
import Cities from "../cities/cities";
import {sortingFunction} from "../../store/offers/offers-utils";
import citiesProp from "../cities/cities.prop";
import OfferSorting from "../offer-sorting/offer-sorting";
import {getCurrentCity} from "../../store/cities/cities-utils";
import {getOffersByCity} from "../../store/offers/offers-utils";
import SpinerScreen from "../spiner-screen/spiner-screen";
import ServiceIsUnavailableScreen from "../service-is-unavailable-screen/service-is-unavailable-screen";
import Header from "../header/header";

const MainScreen = ({offers, currentCity, needShowSpinner, needShowError}) => {
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

MainScreen.propTypes = {
  offers: PropTypes.arrayOf(roomOfferProp).isRequired,
  currentCity: citiesProp,
  needShowSpinner: PropTypes.bool.isRequired,
  needShowError: PropTypes.bool.isRequired
};

const mapStateToProps = (state, props) => ({
  ...props,
  needShowSpinner: state.OFFERS.status === LoadStatus.INITIAL || state.OFFERS.status === LoadStatus.FETCHING,
  needShowError: state.OFFERS.status === LoadStatus.FAILURE,
  currentCity: getCurrentCity(state),
  offers: getOffersByCity(state),
});

export {MainScreen};
export default connect(mapStateToProps)(MainScreen);
