import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from "prop-types";
import OffersList from "../offers-list/offers-list";
import Map from "../map/map";
import roomOfferProp from '../room-screen/room-screen.prop';
import {DEFAULT_SORTING_TYPE, OffersListClassName} from "../../const";
import Cities from "../cities/cities";
import {sortingFunction} from "../../store/offers/offers-utils";
import citiesProp from "../cities/cities.prop";
import OfferSorting from "../offer-sorting/offer-sorting";
import {fetchOfferList} from "../../store/api-actions";
import {getCurrentCity} from "../../store/city/city-utils";
import {getOffersByCity} from "../../store/offers/offers-utils";
import Spiner from "../spiner/spiner";

const MainScreen = ({offers, currentCity, isDataLoading, onLoadData}) => {
  const [activeType, setActiveType] = useState(DEFAULT_SORTING_TYPE);
  const [sortedOffers, setSortedOffers] = useState(offers);

  useEffect(() => {
    setSortedOffers(offers.sort(sortingFunction(offers, activeType)));
  }, [activeType, currentCity]);

  useEffect(() => {
    onLoadData();
  }, [isDataLoading]);

  if (!isDataLoading) {
    return (
      <Spiner/>
    );
  }

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link header__logo-link--active" to="/">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to="/favorites">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

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
  isDataLoading: PropTypes.bool,
  onLoadData: PropTypes.func
};

const mapDispatchToProps = (dispatch) => ({
  onLoadData() {
    dispatch(fetchOfferList());
  }
});

const mapStateToProps = (state, props) => ({
  ...props,
  isDataLoading: state.OFFERS.isDataLoading,
  currentCity: getCurrentCity(state.OFFERS.offers, state),
  offers: getOffersByCity(state)
});

export {MainScreen};
export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
