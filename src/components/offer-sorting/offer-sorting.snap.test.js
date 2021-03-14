import React from "react";
import {render} from "@testing-library/react";
import OfferSorting from "./offer-sorting";
import {DEFAULT_SORTING_TYPE} from "../../const";

describe(`OfferSorting tests`, () => {
  it(`Should OfferSorting render correctly`, () => {
    const {container} = render(
        <OfferSorting
          activeType={DEFAULT_SORTING_TYPE}
          onSortChange={jest.fn}
        />);
    expect(container).toMatchSnapshot();
  });
});
