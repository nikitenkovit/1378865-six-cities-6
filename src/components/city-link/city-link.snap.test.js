import React from "react";
import {render} from "@testing-library/react";
import CityLink from "./city-link";
import {DEFAULT_CURRENT_CITY} from "../../const";

const mockProps = {
  city: DEFAULT_CURRENT_CITY,
  isActive: true,
  onCityLinkClick: jest.fn()
};

it(`Should CityLink render correctly`, () => {
  const {container} = render(
      <CityLink {...mockProps}/>);
  expect(container).toMatchSnapshot();
});
