import React from 'react';
import OfferCard from "./offer-card";

const OfferCardCity = (props) => {
  return (
    <OfferCard
      offerCardClassName={{
        articleClass: `cities__place-card`,
        wrapperClass: `cities__image-wrapper`,
        infoClass: ``
      }}
      isHoverHandler={true}
      {...props}
    />
  );
};

export default OfferCardCity;
