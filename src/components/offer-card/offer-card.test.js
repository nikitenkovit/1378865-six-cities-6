import React from "react";
import {render} from "../../utils/test-utils";
import {screen} from "@testing-library/react";
import OfferCard from "./offer-card";
import userEvent from "@testing-library/user-event";

const testStore = {};

const mockOffer = {
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
};

describe(`OfferCard tests`, () => {

  it(`Should OfferCard render correctly`, () => {
    const {container} = render(
        <OfferCard
          offerCardClassName={{
            articleClass: `cities__place-card`,
            wrapperClass: `cities__image-wrapper`,
            infoClass: ``,
            imageWidth: `260`,
            imageHeight: `200`
          }}
          offer={mockOffer}
          isHoverHandler={true}
          onMouseEnter={jest.fn}
          onMouseLeave={jest.fn}
        />,
        {store: testStore});
    expect(container).toMatchSnapshot();
  });

  it(`OfferCard should be 'handleMouseEnter' called when 'onMouseEnter' effect happen`, () => {
    const handleMouseEnter = jest.fn();

    handleMouseEnter.mockImplementation(() => jest.fn());

    render(
        <OfferCard
          offerCardClassName={{
            articleClass: `cities__place-card`,
            wrapperClass: `cities__image-wrapper`,
            infoClass: ``,
            imageWidth: `260`,
            imageHeight: `200`
          }}
          offer={mockOffer}
          isHoverHandler={true}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={jest.fn}
        />,
        {store: testStore});

    userEvent.hover(screen.getByText(`Rating`));

    expect(handleMouseEnter).toHaveBeenCalled();
  });

  it(`OfferCard should be 'handleMouseLeave' called when 'onMouseLeave' effect happen`, () => {
    const handleMouseLeave = jest.fn();

    handleMouseLeave.mockImplementation(() => jest.fn());

    render(
        <OfferCard
          offerCardClassName={{
            articleClass: `cities__place-card`,
            wrapperClass: `cities__image-wrapper`,
            infoClass: ``,
            imageWidth: `260`,
            imageHeight: `200`
          }}
          offer={mockOffer}
          isHoverHandler={true}
          onMouseEnter={jest.fn}
          onMouseLeave={handleMouseLeave}
        />,
        {store: testStore});

    userEvent.unhover(screen.getByText(`Rating`));

    expect(handleMouseLeave).toHaveBeenCalled();
  });
});
