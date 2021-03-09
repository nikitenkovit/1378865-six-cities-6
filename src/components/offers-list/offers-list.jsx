import React from 'react';
import PropTypes from "prop-types";
import OfferCardCity from '../offer-card/offer-card-city';
import roomOfferProp from '../room-screen/room-screen.prop';
import {OffersListClassName} from "../../const";
import OfferCardNear from "../offer-card/offer-card-near";
import {useDispatch} from "react-redux";
import OfferLocationActionCreator from '../../store/offer-location/action-creator';

const OffersList = ({offers, offersListClassName}) => {
  const dispatch = useDispatch();

  const handleMouseEnter = (location) => {
    dispatch(OfferLocationActionCreator.changeOfferLocation(location));
  };

  const handleMouseLeave = () => {
    dispatch(OfferLocationActionCreator.changeOfferLocation(null));
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

export default React.memo(OffersList);
