import React from 'react';
import OfferCard from "./offer-card";

const OfferCardNear = (props) => {
  return (
    <OfferCard
      offerCardClassName={{
        articleClass: `near-places__card`,
        wrapperClass: `near-places__image-wrapper`,
        infoClass: ``,
        imageWidth: `260`,
        imageHeight: `200`
      }}
      isHoverHandler={false}
      {...props}
    />
  );
};

export default OfferCardNear;
