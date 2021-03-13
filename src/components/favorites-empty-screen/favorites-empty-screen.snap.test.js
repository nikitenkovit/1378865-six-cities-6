import React from "react";
import {Router} from 'react-router-dom';
import {render} from "@testing-library/react";
import FavoritesEmptyScreen from "./favorites-empty-screen";
import browserHistory from "../../history";
import * as redux from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore({});

it(`Should FavoritesEmptyScreen render correctly`, () => {
  const {container} = render(
      <redux.Provider store={mockStore({
        USER: {
          user: null
        }
      })}>
        <Router history={browserHistory}>
          <FavoritesEmptyScreen/>
        </Router>);
      </redux.Provider>);
  expect(container).toMatchSnapshot();
});
