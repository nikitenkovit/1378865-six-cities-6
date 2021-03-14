import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from "redux-thunk";
import {createAPI} from "./api";
import {composeWithDevTools} from 'redux-devtools-extension';
import {Provider} from 'react-redux';
import App from './components/app/app';
import UserActionCreator from './store/user/action-creator/action-creator';
import {AuthorizationStatus} from "./const";
import {checkAuth, fetchOfferList} from "./store/api-actions";
import reducer from './store/root-reducer';
import {redirect} from "./store/middlewares/redirect";
import browserHistory from "./history";

const api = createAPI(
    () => store.dispatch(UserActionCreator.requiredAuthorization(AuthorizationStatus.NO_AUTH))
);

const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api)),
    applyMiddleware(redirect)
));

store.dispatch(checkAuth());

store.dispatch(fetchOfferList());

ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory}>
        <App/>
      </Router>
    </Provider>,
    document.querySelector(`#root`)
);
