import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from "redux-thunk";
import {createAPI} from "./api";
import {composeWithDevTools} from 'redux-devtools-extension';
import {Provider} from 'react-redux';
import App from './components/app/app';
import UserActionCreator from './store/user/ation-creator';
import {AuthorizationStatus} from "./const";
import {checkAuth} from "./store/api-actions";

import reducer from './store/root-reducer';

const api = createAPI(
    () => store.dispatch(UserActionCreator.requiredAuthorization(AuthorizationStatus.NO_AUTH))
);

const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api))
));

store.dispatch(checkAuth());

ReactDOM.render(
    <Provider store={store}>
      <App
      />
    </Provider>,
    document.querySelector(`#root`)
);
