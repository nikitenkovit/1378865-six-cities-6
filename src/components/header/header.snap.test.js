import React from "react";
import {render} from "@testing-library/react";
import Header from "./header";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";
import browserHistory from "../../history";
import configureStore from "redux-mock-store";

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

it(`Should Header render correctly`, () => {
  const {container} = render(<Header isFavoriteScreen={true} />, {wrapper});
  expect(container).toMatchSnapshot();
});
