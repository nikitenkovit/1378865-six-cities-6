import React from 'react';
import OfferCard from "./offer-card";
import {OfferCardClassName} from "../../const";
import offerCardClassNameProp from "./offer-card-class-name-prop";
import roomOfferProp from "../room-screen/room-offer-prop";
import PropTypes from "prop-types";

const OfferCardFavorites = (props) => {
  return (
    <OfferCard
      offerCardClassName={OfferCardClassName.FAVORITES}
      isHoverHandler={false}
      {...props}
    />
  );
};

OfferCard.propTypes = {
  offerCardClassName: offerCardClassNameProp,
  offer: roomOfferProp,
  isHoverHandler: PropTypes.bool.isRequired,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func
};

export default OfferCardFavorites;
