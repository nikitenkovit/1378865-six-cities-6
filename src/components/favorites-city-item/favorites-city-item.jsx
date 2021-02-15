import React from 'react';
import PropTypes from "prop-types";
import OfferCard from "../offer-card/offer-card";
import roomOfferProp from '../room-screen/room-offer-prop';

const FavoritesCityItem = ({cityName, cityOffers}) => {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{cityName}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {cityOffers.map((offer) =>
          <OfferCard
            key={offer.id}
            offer={offer}
          />
        )}
      </div>
    </li>
  );
};

FavoritesCityItem.propTypes = {
  cityName: PropTypes.string.isRequired,
  cityOffers: PropTypes.arrayOf(roomOfferProp).isRequired
};

export default FavoritesCityItem;
