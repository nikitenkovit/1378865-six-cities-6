import React, {useState} from 'react';
import PropTypes from "prop-types";
import OfferCardCity from '../offer-card/offer-card-city';
import roomOfferProp from '../room-screen/room-screen-offer.prop';
import {OffersListClassName} from "../../const";
import OfferCardNear from "../offer-card/offer-card-near";

const OffersList = ({offers, offersListClassName}) => {
  const [activeCardId, setActiveCardId] = useState(``);

  const handleMouseEnter = (id) => {
    setActiveCardId(id);

    return activeCardId; // return временный, что бы линтер не ругался на неиспользованнную переменную.
  };

  const handleMouseLeave = () => {
    setActiveCardId(null);
  };

  const getComponentByListClassName = (offer) => {
    if (offersListClassName === OffersListClassName.CITY_PLACES) {
      return <OfferCardCity
        key={offer.id}
        offer={offer}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />;
    }
    return <OfferCardNear
      key={offer.id}
      offer={offer}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />;
  };

  return (
    <div className={`${offersListClassName} places__list
     ${offersListClassName === OffersListClassName.CITY_PLACES ? `tabs__content` : ``}`}>
      {
        offers.map((offer) =>
          getComponentByListClassName(offer)
        )
      }
    </div>
  );
};

OffersList.propTypes = {
  offers: PropTypes.arrayOf(roomOfferProp).isRequired,
  offersListClassName: PropTypes.string.isRequired
};

OfferCardCity.propTypes = {
  offer: roomOfferProp,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func
};

export default OffersList;
