import React from "react";
import {render, screen} from "@testing-library/react";
import CityLink from "./city-link";
import {DEFAULT_CURRENT_CITY} from "../../const";
import userEvent from "@testing-library/user-event";

describe(`BookmarkButton tests`, () => {
  it(`When user click 'City link' when city link name not equal current city name
   and needFetchOffer equally 'true' should be 'City link' work correctly`, () => {

    const currentCity = {name: `Amsterdam`};
    const fakeChangeCityFn = jest.fn();
    const fakeFetchOfferListFn = jest.fn();
    const needFetchOffers = true;

    const handleCityLinkClick = jest.fn();

    handleCityLinkClick.mockImplementation((city) => {
      if (city.name !== currentCity.name) {
        fakeChangeCityFn();
      }

      if (needFetchOffers) {
        fakeFetchOfferListFn();
      }
    });

    render(<CityLink
      city={DEFAULT_CURRENT_CITY}
      isActive={true}
      onCityLinkClick={() => {
        handleCityLinkClick(DEFAULT_CURRENT_CITY);
      }}
    />);

    userEvent.click(screen.getByText(`${DEFAULT_CURRENT_CITY.name}`));

    expect(handleCityLinkClick).toHaveBeenCalled();
    expect(fakeChangeCityFn).toHaveBeenCalledTimes(1);
    expect(fakeFetchOfferListFn).toHaveBeenCalledTimes(1);
  });

  it(`When user click 'City link' when city link name equally current city name
   and needFetchOffer equally 'false' should be 'City link' work correctly`, () => {

    const currentCity = DEFAULT_CURRENT_CITY;
    const fakeChangeCityFn = jest.fn();
    const fakeFetchOfferListFn = jest.fn();
    const needFetchOffers = false;

    const handleCityLinkClick = jest.fn();

    handleCityLinkClick.mockImplementation((city) => {
      if (city.name !== currentCity.name) {
        fakeChangeCityFn();
      }

      if (needFetchOffers) {
        fakeFetchOfferListFn();
      }
    });

    render(<CityLink
      city={DEFAULT_CURRENT_CITY}
      isActive={true}
      onCityLinkClick={() => {
        handleCityLinkClick(DEFAULT_CURRENT_CITY);
      }}
    />);

    userEvent.click(screen.getByText(`${DEFAULT_CURRENT_CITY.name}`));

    expect(handleCityLinkClick).toHaveBeenCalled();
    expect(fakeChangeCityFn).not.toHaveBeenCalled();
    expect(fakeFetchOfferListFn).not.toHaveBeenCalled();
  });
});
