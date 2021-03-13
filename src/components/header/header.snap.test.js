import React from "react";
import * as redux from 'react-redux';
import {Router} from 'react-router-dom';
import {render} from "@testing-library/react";
import configureStore from 'redux-mock-store';
import Header from "./header";
import browserHistory from "../../history";

const mockStore = configureStore({});

describe(`Header tests`, () => {
  it(`Should Header render correctly`, () => {
    const {container} = render(
        <redux.Provider store={mockStore({
          USER: {
            user: null
          }
        })}>
          <Router history={browserHistory}>
            <Header
              isFavoriteScreen={false}
            />
          </Router>
        </redux.Provider>);
    expect(container).toMatchSnapshot();
  });
});
