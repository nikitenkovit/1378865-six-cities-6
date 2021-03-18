import React from "react";
import {render, screen} from "@testing-library/react";
import OfferSortingType from "./offer-sorting-type";
import {DEFAULT_SORTING_TYPE} from "../../const";
import userEvent from "@testing-library/user-event";

describe(`OfferSortingType tests`, () => {
  it(`Should OfferSortingType not active render correctly`, () => {
    render(
        <OfferSortingType
          type={DEFAULT_SORTING_TYPE}
          onSelectType={jest.fn}
          isActive={false}
        />);

    expect(screen.getByText(`${DEFAULT_SORTING_TYPE}`)).toBeInTheDocument();
  });

  it(`Should OfferSortingType active render correctly`, () => {
    render(
        <OfferSortingType
          type={DEFAULT_SORTING_TYPE}
          onSelectType={jest.fn}
          isActive={true}
        />);

    expect(screen.getByText(`${DEFAULT_SORTING_TYPE}`)).toBeInTheDocument();
  });

  it(`OfferSortingType should be 'handleTypeSelect' called when 'onClick' effect happen`, () => {
    const handleTypeSelect = jest.fn();

    handleTypeSelect.mockImplementation(() => jest.fn());

    render(
        <OfferSortingType
          type={DEFAULT_SORTING_TYPE}
          onSelectType={handleTypeSelect}
          isActive={true}
        />);

    userEvent.click(screen.getByText(`${DEFAULT_SORTING_TYPE}`));

    expect(handleTypeSelect).toHaveBeenCalled();
  });
});
