import React from "react";
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {render} from "@testing-library/react";
import configureStore from 'redux-mock-store';
import Header from "./header";
import browserHistory from "../../history";

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
  it(`Should Header render correctly`, () => {
    const {container} = render(<Header isFavoriteScreen={true} />, {wrapper});
    expect(container).toMatchSnapshot();
  });

  it(`Should Header render correctly when is not favorite Screen`, () => {
    const {container} = render(<Header isFavoriteScreen={false} />, {wrapper});
    expect(container).toMatchSnapshot();
  });
});
