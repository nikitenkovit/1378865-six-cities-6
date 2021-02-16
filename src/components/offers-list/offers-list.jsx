import React, {useState} from 'react';
import PropTypes from "prop-types";
import OfferCard from "../offer-card/offer-card";
import roomOfferProp from '../room-screen/room-offer-prop';

const OffersList = ({offers}) => {
  const [activeCardId, setActiveCardId] = useState(``);

  const handleMouseEnter = (id) => {
    setActiveCardId(id);

    return activeCardId; // return временный, что бы линтер не ругался на неиспользованнную переменную.
  };

  const handleMouseLeave = () => {
    setActiveCardId(null);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {
        offers.map((offer) =>
          <OfferCard
            key={offer.id}
            offer={offer}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        )
      }
    </div>
  );
};

OffersList.propTypes = {
  offers: PropTypes.arrayOf(roomOfferProp)
};

OfferCard.propTypes = {
  offer: roomOfferProp,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func
};

export default OffersList;
