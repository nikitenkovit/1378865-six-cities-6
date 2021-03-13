import React from "react";
import {render} from "@testing-library/react";
import FavoritesCityItem from "./favorites-city-item";

const mock = {
  cityName: `Paris`,
  cityOffers: []
};

it(`Should FavoritesCityItem render correctly`, () => {
  const {container} = render(
      <FavoritesCityItem
        cityName={mock.cityName}
        cityOffers={mock.cityOffers}
      />);
  expect(container).toMatchSnapshot();
});
