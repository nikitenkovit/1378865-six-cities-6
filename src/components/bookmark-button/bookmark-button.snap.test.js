import React from "react";
import {render} from "../../utils/test-utils";
import configureStore from 'redux-mock-store';
import BookmarkButton from "./bookmark-button";
import {BookmarkButtonProperty} from "../../const";

const mockProps = {
  id: 1,
  isFavorite: false,
  bookmarkButtonProperty: BookmarkButtonProperty.OFFER_CARD
};

const mockStore = configureStore({});

describe(`BookmarkButton tests`, () => {
  it(`Should BookmarkButton render correctly`, () => {
    const {container} = render(
        <BookmarkButton {...mockProps} />,
        {store: mockStore});
    expect(container).toMatchSnapshot();
  });
});
