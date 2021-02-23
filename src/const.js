export const OfferType = {
  APARTMENT: `Apartment`,
  ROOM: `Private Room`,
  HOUSE: `House`,
  HOTEL: `Hotel`
};

export const OffersListClassName = {
  CITY_PLACES: `cities__places-list`,
  NEAR_PLACES: `near-places__list`
};

export const BookmarkButtonProperty = {
  ROOM_SCREEN: {
    buttonClass: `property__bookmark-button`,
    iconClass: `property__bookmark-icon`,
    iconWidth: `31`,
    iconHeight: `33`
  },
  OFFER_CARD: {
    buttonClass: `place-card__bookmark-button`,
    iconClass: `place-card__bookmark-icon`,
    iconWidth: `18`,
    iconHeight: `19`
  }
};

export const DEFAULT_CURRENT_CITY = `Paris`;

export const MapMarkerProperty = {
  DEFAULT: {
    iconUrl: `./img/pin.svg`,
    iconSize: [30, 30]
  },
  ACTIVE: {
    iconUrl: `./img/pin-active.svg`,
    iconSize: [30, 30]
  }
};
