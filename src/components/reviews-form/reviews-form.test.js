import React from 'react';
import {render, screen} from "@testing-library/react";
import ReviewForm from "./review-form";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {SendStatus} from "../../const";
import {Router} from "react-router-dom";
import browserHistory from "../../history";
import * as redux from "react-redux";
import userEvent from "@testing-library/user-event";

const mockStore = configureStore({});
const mockId = 1;

const wrapper = ({children}) => (
  <Provider store={mockStore({
    COMMENT: {
      status: SendStatus.INITIAL
    }
  })}>
    <Router history={browserHistory}>
      {children}
    </Router>
  </Provider>
);

describe(`ReviewForm tests`, () => {
  it(`Review form render correctly`, () => {
    render(<ReviewForm id={mockId}/>, {wrapper});

    expect(screen.getByText(`Your review`)).toBeInTheDocument();
    expect(screen.getByText(/To submit review please make sure to set/i)).toBeInTheDocument();
  });

  it(`When the form is filled out correctly should submits the form`, () => {
    const fakeDispatch = jest.fn();

    jest.spyOn(redux, `useDispatch`).mockImplementation(() => fakeDispatch);

    render(<ReviewForm id={mockId}/>, {wrapper});

    userEvent.click(screen.getByDisplayValue(`5`));

    userEvent.type(screen.getByRole(`textbox`), `Lorem ipsum dolor sit amet, consectetur adipisicing elit.` +
      ` At cum dolor dolorem dolorum et expedita facilis labore minus, modi nisi omnis possimus` +
      ` quae quasi rem sequi sint unde, vel velit?`);

    userEvent.click(screen.getByText(`Submit`));

    expect(fakeDispatch).toHaveBeenCalled();
  });

  it(`If the user has not given a rating, the form should not be submitted`, () => {
    const fakeDispatch = jest.fn();

    jest.spyOn(redux, `useDispatch`).mockImplementation(() => fakeDispatch);

    render(<ReviewForm id={mockId}/>, {wrapper});

    userEvent.type(screen.getByRole(`textbox`), `Lorem ipsum dolor sit amet, consectetur adipisicing elit.` +
      ` At cum dolor dolorem dolorum et expedita facilis labore minus, modi nisi omnis possimus` +
      ` quae quasi rem sequi sint unde, vel velit?`);

    userEvent.click(screen.getByText(`Submit`));

    expect(fakeDispatch).not.toHaveBeenCalled();
  });

  it(`If the user entered text less than 50 characters, the form should not be submitted`, () => {
    const fakeDispatch = jest.fn();

    jest.spyOn(redux, `useDispatch`).mockImplementation(() => fakeDispatch);

    render(<ReviewForm id={mockId}/>, {wrapper});

    userEvent.click(screen.getByDisplayValue(`5`));

    userEvent.type(screen.getByRole(`textbox`), `Hello World!`);

    userEvent.click(screen.getByText(`Submit`));

    expect(fakeDispatch).not.toHaveBeenCalled();
  });
});
