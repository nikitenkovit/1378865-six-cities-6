import React from 'react';
import {render} from "@testing-library/react";
import CityLink from "./city-link";
import {DEFAULT_CURRENT_CITY} from "../../const";

it(`Should CityLink render correctly`, () => {
  const {container} = render(
      <CityLink
        city={DEFAULT_CURRENT_CITY}
        isActive={true}
        onCityLinkClick={jest.fn()}
      />);

  expect(container).toMatchSnapshot();
});
