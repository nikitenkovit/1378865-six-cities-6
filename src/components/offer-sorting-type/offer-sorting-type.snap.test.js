import React from "react";
import {render} from "@testing-library/react";
import OfferSortingType from "./offer-sorting-type";
import {DEFAULT_SORTING_TYPE} from "../../const";

describe(`OfferSortingType tests`, () => {
  it(`Should OfferSortingType not active render correctly`, () => {
    const {container} = render(
        <OfferSortingType
          type={DEFAULT_SORTING_TYPE}
          onSelectType={jest.fn}
          isActive={false}
        />);
    expect(container).toMatchSnapshot();
  });

  it(`Should OfferSortingType active render correctly`, () => {
    const {container} = render(
        <OfferSortingType
          type={DEFAULT_SORTING_TYPE}
          onSelectType={jest.fn}
          isActive={true}
        />);
    expect(container).toMatchSnapshot();
  });
});
