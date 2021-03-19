import React from "react";
import {render} from "@testing-library/react";
import {screen} from "@testing-library/react";
import SignInScreen from "./sign-in-screen";
import * as redux from "react-redux";
import userEvent from "@testing-library/user-event";
import browserHistory from "../../history";
import {AppRoute, AuthorizationStatus, ServiceAvailableStatus} from "../../const";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {Route, Router, Switch} from "react-router-dom";

const mockStore = configureStore({});

const wrapper = ({children}) => (
  <Provider store={mockStore({
    USER: {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      user: null
    },
    SERVICE_AVAILABLE_STATUS: {
      status: ServiceAvailableStatus.AVAILABLE
    }
  })}>
    <Router history={browserHistory}>
      {children}
    </Router>
  </Provider>
);

describe(`SignInScreen tests`, () => {
  it(`Should SignInScreen render correctly`, () => {
    render(<SignInScreen/>, {wrapper});

    expect(screen.getByText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
  });

  it(`When all the fields is filled out correctly should submits the form and redirect to Main screen`, () => {
    browserHistory.push(AppRoute.LOGIN);

    const fakeDispatch = jest.fn();
    fakeDispatch.mockImplementation(() => browserHistory.push(AppRoute.MAIN));

    jest.spyOn(redux, `useDispatch`).mockImplementation(() => fakeDispatch);

    render(
        <Provider store={mockStore({
          USER: {
            authorizationStatus: AuthorizationStatus.NO_AUTH,
            user: null
          },
          SERVICE_AVAILABLE_STATUS: {
            status: ServiceAvailableStatus.AVAILABLE
          }
        })}>
          <Router history={browserHistory}>
            <Switch>
              <Route exact path={AppRoute.LOGIN}><SignInScreen/></Route>
              <Route exact path={AppRoute.MAIN}><h1>Main Screen</h1></Route>
            </Switch>
          </Router>
        </Provider>
    );

    userEvent.type(screen.getByPlaceholderText(`Email`), `test@test.com`);
    userEvent.type(screen.getByPlaceholderText(`Password`), `test`);

    userEvent.click(screen.getByRole(`button`));

    expect(fakeDispatch).toHaveBeenCalled();

    expect(screen.getByText(/Main Screen/i)).toBeInTheDocument();
  });

  it(`If the user not pass email, the form should not be submitted`, () => {
    const fakeDispatch = jest.fn();

    jest.spyOn(redux, `useDispatch`).mockImplementation(() => fakeDispatch);

    render(<SignInScreen/>, {wrapper});

    userEvent.type(screen.getByPlaceholderText(`Password`), `test`);

    userEvent.click(screen.getByRole(`button`));

    expect(fakeDispatch).not.toHaveBeenCalled();
  });

  it(`If the user not pass password, the form should not be submitted`, () => {
    const fakeDispatch = jest.fn();

    jest.spyOn(redux, `useDispatch`).mockImplementation(() => fakeDispatch);

    render(<SignInScreen/>, {wrapper});

    userEvent.type(screen.getByPlaceholderText(`Email`), `test@test.com`);

    userEvent.click(screen.getByRole(`button`));

    expect(fakeDispatch).not.toHaveBeenCalled();
  });

  it(`Sign in screen render 'ServiceUnavailableScreen' when service unavailable`, () => {
    render(<Provider store={mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        user: null
      },
      SERVICE_AVAILABLE_STATUS: {
        status: ServiceAvailableStatus.UNAVAILABLE
      }
    })}>
      <Router history={browserHistory}>
        <SignInScreen/>
      </Router>
    </Provider>);

    expect(screen.getByText(/Service is unavailable/i)).toBeInTheDocument();
  });
});
