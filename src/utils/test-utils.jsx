import React from "react";
import {Router} from 'react-router-dom';
import {render as pureRender} from "@testing-library/react";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import browserHistory from "../history";

const render = (
    ui, {
      store = {},
      ...otherOptions
    }) => {
  const wrapper = ({children}) => (
    <Provider store={configureStore()(store)}>
      <Router history={browserHistory}>
        {children}
      </Router>
    </Provider>
  );
  return pureRender(ui, {wrapper, ...otherOptions});
};

// Реэкспортим библиотеку, чтобы не нужно было ее подключать.
export * from '@testing-library/react';
export {render};
