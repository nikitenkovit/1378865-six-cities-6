import React from "react";
import {render} from "../../utils/test-utils";
import Cities from "./cities";
import {DefaultCitiesList, DEFAULT_CURRENT_CITY, LoadStatus} from "../../const";

const testStore = {
  CITIES: {
    items: DefaultCitiesList,
    current: DEFAULT_CURRENT_CITY
  },
  OFFERS: {
    items: [],
    status: LoadStatus.SUCCESS
  }
};

describe(`Cities tests`, () => {
  it(`Should Cities render correctly`, () => {
    const {container} = render(
        <Cities/>,
        {store: testStore}
    );
    expect(container).toMatchSnapshot();
  });
});
