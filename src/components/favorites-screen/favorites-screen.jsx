import React from 'react';
import {Link} from 'react-router-dom';
import {nanoid} from "nanoid";
import PropTypes from "prop-types";
import FavoritesCityItem from "../favorites-city-item/favorites-city-item";

const FavoritesScreen = ({offers}) => {

  const filteredOffers = offers.filter((offer) => offer.isFavorite)
    .reduce((generalOffer, offer) => {
      generalOffer.hasOwnProperty(offer.city.name)
        ? generalOffer[offer.city.name].push(offer)
        : generalOffer[offer.city.name] = [offer];

      return generalOffer;
    }, {});

  const filteredOffersArray = Object.entries(filteredOffers);

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to="/">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {filteredOffersArray.map(([cityName, cityOffers]) =>
                <FavoritesCityItem
                  key={nanoid()}
                  cityName={cityName}
                  cityOffers={cityOffers}
                />
              )}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to="/">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </Link>
      </footer>
    </div>
  );
};

FavoritesScreen.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.object.isRequired)
};
FavoritesCityItem.propTypes = {
  cityName: PropTypes.string,
  cityOffers: PropTypes.arrayOf(PropTypes.object.isRequired)
};

export default FavoritesScreen;
