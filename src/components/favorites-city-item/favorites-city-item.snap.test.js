import React from "react";
import {render} from "@testing-library/react";
import FavoritesCityItem from "./favorites-city-item";

const mockProps = {
  cityName: `Paris`,
  cityOffers: []
};

it(`Should FavoritesCityItem render correctly`, () => {
  const {container} = render(
      <FavoritesCityItem {...mockProps}/>);
  expect(container).toMatchSnapshot();
});
