import React from "react";
import {render} from "../../utils/test-utils";
import {screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import configureStore from 'redux-mock-store';
import BookmarkButton from "./bookmark-button";
import {BookmarkButtonProperty} from "../../const";
import * as redux from "react-redux";

const mockProps = {
  id: 1,
  isFavorite: false,
  bookmarkButtonProperty: BookmarkButtonProperty.OFFER_CARD
};

const mockStore = configureStore({});

describe(`BookmarkButton tests`, () => {
  it(`Should BookmarkButton render correctly`, () => {
    render(<BookmarkButton {...mockProps} />, {store: mockStore});

    expect(screen.getByText(`To bookmarks`)).toBeInTheDocument();
  });

  it(`When user click 'Bookmark Button' should be dispatch called`, () => {
    const fakeDispatch = jest.fn();

    jest.spyOn(redux, `useDispatch`).mockImplementation(() => fakeDispatch);

    render(<BookmarkButton {...mockProps} />, {store: mockStore});

    userEvent.click(screen.getByText(`To bookmarks`));

    expect(fakeDispatch).toHaveBeenCalledTimes(1);
  });
});
