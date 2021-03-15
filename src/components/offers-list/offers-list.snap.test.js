import React from "react";
import {render} from "../../utils/test-utils";
import OffersList from "./offers-list";
import {OffersListClassName} from "../../const";

const testStore = {};

const mockOffer = [{
  "bedrooms": 3,
  "city": {
    "location": {
      "latitude": 52.5909553943508,
      "longitude": 4.95309666406198,
      "zoom": 12
    },
    "name": `Amsterdam`
  },
  "description": `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
  "goods": [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
  "host": {
    "avatar_url": `./img/avatar-angelina.jpg`,
    "id": 3,
    "is_pro": true,
    "name": `Angelina`
  },
  "id": 1,
  "images": [`./img/apartment-01.jpg`, `./img/apartment-02.jpg`, `./img/apartment-03.jpg`, `./img/room.jpg`, `./img/apartment-02.jpg`, `./img/apartment-03.jpg`],
  "is_favorite": true,
  "is_premium": false,
  "location": {
    "latitude": 52.5909553943508,
    "longitude": 4.95309666406198,
    "zoom": 8
  },
  "max_adults": 4,
  "preview_image": `./img/apartment-01.jpg`,
  "price": 120,
  "rating": 4.8,
  "title": `Beautiful & luxurious studio at great location`,
  "type": `apartment`
}];

describe(`OffersList tests`, () => {
  it(`Should OffersList from MainScreen render correctly`, () => {
    const {container} = render(
        <OffersList
          offers={mockOffer}
          offersListClassName={OffersListClassName.CITY_PLACES}
        />,
        {store: testStore});
    expect(container).toMatchSnapshot();
  });

  it(`Should OffersList from RoomScreen render correctly`, () => {
    const {container} = render(
        <OffersList
          offers={mockOffer}
          offersListClassName={OffersListClassName.NEAR_PLACES}
        />,
        {store: testStore});
    expect(container).toMatchSnapshot();
  });
});
