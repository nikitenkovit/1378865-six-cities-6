import React from 'react';
import {render, screen} from "@testing-library/react";
import PrivateRoute from "./private-route";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {AuthorizationStatus} from "../../const";
import {Route, Router} from "react-router-dom";
import browserHistory from "../../history";

const mockStore = configureStore({});

let history;

describe(`Test PrivateRouter`, () => {

  beforeEach(() => {
    history = browserHistory;
    history.push(`/private`);
  });

  it(`Should be render component for public route, when user not authorized`, () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.NO_AUTH}
    });

    render(
        <Provider store={store}>
          <Router history={browserHistory}>
            <Route exact path="/login"><h1>Public Route</h1></Route>
            <PrivateRoute
              exact
              path="/private"
              render={() => (<h1>Private Route</h1>)}
            />
          </Router>
        </Provider>
    );

    expect(screen.getByText(/Public Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Private Route/i)).not.toBeInTheDocument();
  });

  it(`Should be render component for private route, when user authorized`, () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.AUTH}
    });

    render(
        <Provider store={store}>
          <Router history={browserHistory}>
            <Route exact path="/login"><h1>Public Route</h1></Route>
            <PrivateRoute
              exact
              path="/private"
              render={() => (<h1>Private Route</h1>)}
            />
          </Router>
        </Provider>
    );

    expect(screen.getByText(/Private Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Public Route/i)).not.toBeInTheDocument();
  });
});
