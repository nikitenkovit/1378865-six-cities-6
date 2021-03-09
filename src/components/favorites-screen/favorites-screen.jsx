import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {nanoid} from "nanoid";
import PropTypes from "prop-types";
import FavoritesCityItem from "../favorites-city-item/favorites-city-item";
import roomOfferProp from '../room-screen/room-screen.prop';
import Header from "../header/header";

// полностью буду переделывать этот компонент в следущем задании
// (новый редюсер, селекторы и так далее, сейчас не чего оптемизировать. нет смысла)
const FavoritesScreen = ({offers}) => {

  const filteredOffers = offers.filter((offer) => offer.isFavorite)
    .reduce((generalOffer, offer) => {
      if (generalOffer.hasOwnProperty(offer.city.name)) {
        generalOffer[offer.city.name].push(offer);
      } else {
        generalOffer[offer.city.name] = [offer];
      }

      return generalOffer;
    }, {});

  const filteredOffersArray = Object.entries(filteredOffers); // временно, потом вынесу в отдельеый редюсер

  return (
    <div className="page">
      <Header isFavoriteScreen={true}/>

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
  offers: PropTypes.arrayOf(roomOfferProp)
};

const mapStateToProps = (state, props) => ({
  ...props,
  offers: state.OFFERS.items
});

export {FavoritesScreen};
export default connect(mapStateToProps)(FavoritesScreen);
