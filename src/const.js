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

export const MAP_ZOOM = 13;

export const SortingType = {
  POPULAR: `Popular`,
  LOW_TO_HIGH: `Price: low to high`,
  HIGH_TO_LOW: `Price: high to low`,
  TOP_RATED: `Top rated first`
};

export const DEFAULT_SORTING_TYPE = SortingType.POPULAR;

export const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

export const ServiceAvailableStatus = {
  AVAILABLE: `AVAILABLE`,
  UNAVAILABLE: `UNAVAILABLE`,
};

export const LoadStatus = {
  INITIAL: `initial`,
  FETCHING: `fetching`,
  SUCCESS: `success`,
  FAILURE: `failure`
};

export const SendStatus = {
  INITIAL: `initial`,
  SENDING: `sending`,
  SUCCESS: `success`,
  FAILURE: `failure`
};

export const MAX_GALLERY_IMAGES = 6;

export const MAX_REVIEWS = 10;

export const UserCommentLength = {
  MIN: 50,
  MAX: 300
};

export const DEFAULT_CURRENT_CITY = {name: `Paris`};

export const DefaultCitiesList = [
  {name: `Paris`},
  {name: `Cologne`},
  {name: `Brussels`},
  {name: `Amsterdam`},
  {name: `Hamburg`},
  {name: `Dusseldorf`}
];

export const AppRoute = {
  LOGIN: `/login`,
  FAVORITES: `/favorites`,
  ROOM: `/offer/:id`,
  MAIN: `/`
};

export const SHAKE_ANIMATION_TIMEOUT = 600;
