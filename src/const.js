export const OfferType = {
  APARTMENT: `Apartment`,
  ROOM: `Private Room`,
  HOUSE: `House`,
  HOTEL: `Hotel`
};

export const PathValue = {
  MAIN_SCREEN: `/`,
  FAVORITES_SCREEN: `/favorites`,
  ROOM_SCREEN: `/offer/:id`
};

export const CityCoordinate = {
  AMSTERDAM: {
    latitude: 52.38333,
    longitude: 4.9,
    zoom: 12
  }
}; // скорее всего временно

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
