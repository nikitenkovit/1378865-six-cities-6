import React from 'react';
import OfferCard from "./offer-card";

const OfferCardFavorites = (props) => {
  return (
    <OfferCard
      offerCardClassName={{
        articleClass: `favorites__card`,
        wrapperClass: `favorites__image-wrapper`,
        infoClass: `favorites__card-info`
      }}
      isHoverHandler={false}
      {...props}
    />
  );
};

export default OfferCardFavorites;
