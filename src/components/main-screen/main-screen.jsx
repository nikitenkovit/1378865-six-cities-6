import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from "prop-types";
import OffersList from "../offers-list/offers-list";
import Map from "../map/map";
import roomOfferProp from '../room-screen/room-screen.prop';
import {OffersListClassName} from "../../const";
import Cities from "../cities/cities";
import {getOffersByCity} from "../../utils/common";
import {getCurrentCity} from "../../store/city/utils";
import {connect} from 'react-redux';
import citiesProp from "../cities/cities.prop";

const MainScreen = ({offers, currentCity}) => {
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
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex="0">
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"/>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex="0">Popular</li>
                  <li className="places__option" tabIndex="0">Price: low to high</li>
                  <li className="places__option" tabIndex="0">Price: high to low</li>
                  <li className="places__option" tabIndex="0">Top rated first</li>
                </ul>
              </form>
              <OffersList offers={offers} offersListClassName={OffersListClassName.CITY_PLACES}/>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map/>
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
  currentCity: citiesProp
};

const mapStateToProps = (state, props) => ({
  ...props,
  offers: getOffersByCity(state),
  currentCity: getCurrentCity(state)
});

export {MainScreen};
export default connect(mapStateToProps)(MainScreen);
