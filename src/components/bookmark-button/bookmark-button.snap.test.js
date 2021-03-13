import React from "react";
import * as redux from 'react-redux';
import {Router} from 'react-router-dom';
import {render} from "@testing-library/react";
import configureStore from 'redux-mock-store';
import BookmarkButton from "./bookmark-button";
import {BookmarkButtonProperty} from "../../const";
import browserHistory from "../../history";

const mock = {
  id: 1,
  isFavorite: false,
  bookmarkButtonProperty: BookmarkButtonProperty.OFFER_CARD
};

const mockStore = configureStore({});

it(`Should BookmarkButton render correctly`, () => {
  const {container} = render(
      <redux.Provider store={mockStore({})}>
        <Router history={browserHistory}>
          <BookmarkButton
            id={mock.id}
            isFavorite={mock.isFavorite}
            bookmarkButtonProperty={mock.bookmarkButtonProperty}
          />
        </Router>
      </redux.Provider>);
  expect(container).toMatchSnapshot();
});
