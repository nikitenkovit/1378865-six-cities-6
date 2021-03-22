import React from "react";
import {render} from "../../utils/test-utils";
import CitiesNoPlaces from "./cities-no-places";
import {DefaultCitiesList, DEFAULT_CURRENT_CITY, LoadStatus} from "../../const";
import {screen} from "@testing-library/react";

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

describe(`CitiesNoPlaces tests`, () => {
  it(`Should NoPlacesScreen render correctly`, () => {
    render(<CitiesNoPlaces/>, {store: testStore});

    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
  });
});
