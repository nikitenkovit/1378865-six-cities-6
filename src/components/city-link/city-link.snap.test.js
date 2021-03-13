import React from "react";
import {render} from "@testing-library/react";
import CityLink from "./city-link";
import {DEFAULT_CURRENT_CITY} from "../../const";

const mock = {
  city: DEFAULT_CURRENT_CITY,
  isActive: true,
  onCityLinkClick: jest.fn()
};

it(`Should CityLink render correctly`, () => {
  const {container} = render(
      <CityLink
        city={mock.city}
        isActive={mock.isActive}
        onCityLinkClick={mock.onCityLinkClick}
      />);
  expect(container).toMatchSnapshot();
});
