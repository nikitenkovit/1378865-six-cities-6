import React from 'react';
import OfferCard from "./offer-card";

const OfferCardFavorites = (props) => {
  return (
    <OfferCard
      offerCardClassName={{
        articleClass: `favorites__card`,
        wrapperClass: `favorites__image-wrapper`,
        infoClass: `favorites__card-info`,
        imageWidth: `150`,
        imageHeight: `110`
      }}
      isHoverHandler={false}
      {...props}
    />
  );
};

export default OfferCardFavorites;
