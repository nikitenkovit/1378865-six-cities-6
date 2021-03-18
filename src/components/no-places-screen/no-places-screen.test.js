import React from "react";
import {render} from "../../utils/test-utils";
import NoPlacesScreen from "./no-places-screen";
import {DefaultCitiesList, DEFAULT_CURRENT_CITY, LoadStatus} from "../../const";
import {screen} from "@testing-library/react";
import * as redux from "react-redux";

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
    render(<NoPlacesScreen/>, {store: testStore});

    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
  });

  it(`NoPlacesScreen should be dispatch called when is need redirect to main screen`, () => {
    const fakeDispatch = jest.fn();

    jest.spyOn(redux, `useDispatch`).mockImplementation(() => fakeDispatch);

    render(<NoPlacesScreen/>,
        {store:
            {
              USER: {
                user: null
              },
              CITIES: {
                items: DefaultCitiesList,
                current: DEFAULT_CURRENT_CITY
              },
              OFFERS: {
                items: [{city: {name: `Paris`}}],
                status: LoadStatus.SUCCESS
              }
            }
        });

    expect(fakeDispatch).toHaveBeenCalledTimes(1);
  });
});
