import React from "react";
import {render} from "../../utils/test-utils";
import NoPlacesScreen from "./no-places-screen";
import {DefaultCitiesList, DEFAULT_CURRENT_CITY, LoadStatus} from "../../const";

const testStore = {
  USER: {
    user: null
  },
  CITIES: {
    items: DefaultCitiesList,
    current: DEFAULT_CURRENT_CITY
  },
  OFFERS: {
    items: [],
    status: LoadStatus.FAILURE
  }
};

describe(`NoPlacesScreen tests`, () => {
  it(`Should NoPlacesScreen render correctly`, () => {
    const {container} = render(
        <NoPlacesScreen/>,
        {store: testStore},
    );
    expect(container).toMatchSnapshot();
  });
});
