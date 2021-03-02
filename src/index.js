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
import {checkAuth, fetchOfferList} from "./store/api-actions";
import {Router} from 'react-router-dom';
import history from "./history";

import reducer from './store/root-reducer';

const api = createAPI(
    () => store.dispatch(UserActionCreator.requiredAuthorization(AuthorizationStatus.NO_AUTH))
);

const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api))
));

store.dispatch(checkAuth());

store.dispatch(fetchOfferList());

ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <App/>
      </Router>
    </Provider>,
    document.querySelector(`#root`)
);
