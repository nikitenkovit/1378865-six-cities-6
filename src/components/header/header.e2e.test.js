import React from "react";
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {render, screen} from "@testing-library/react";
import configureStore from 'redux-mock-store';
import Header from "./header";
import browserHistory from "../../history";
import * as redux from "react-redux";
import userEvent from "@testing-library/user-event";

const mockStore = configureStore({});

const wrapper = ({children}) => (
  <Provider store={mockStore({
    USER: {
      email: `test@test.ru`,
      name: `Name`,
    }
  })}>
    <Router history={browserHistory}>
      {children}
    </Router>
  </Provider>
);

describe(`Header tests`, () => {
  it(`When user click 'Logout button' should be dispatch called`, () => {
    const fakeDispatch = jest.fn();

    jest.spyOn(redux, `useDispatch`).mockImplementation(() => fakeDispatch);

    render(<Header isFavoriteScreen={true} />, {wrapper});

    userEvent.click(screen.getByText(`Logout`));

    expect(fakeDispatch).toHaveBeenCalledTimes(1);
  });
});
