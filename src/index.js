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
import {AuthorizationStatus, ServiceAvailableStatus} from "./const";
import {checkAuth} from "./store/api-actions/check-auth/check-auth";
import {fetchOfferList} from "./store/api-actions/fetch-offer-list/fetch-offer-list";
import reducer from './store/root-reducer';
import {redirect} from "./store/middlewares/redirect/redirect";
import browserHistory from "./history";
import ServiceAvailableStatusActionCreator from "./store/service-available-status/action-creator/action-creator";

const api = createAPI(
    () => store.dispatch(UserActionCreator.requiredAuthorization(AuthorizationStatus.NO_AUTH)),
    () => store.dispatch(ServiceAvailableStatusActionCreator
      .changeServiceAvailableStatus(ServiceAvailableStatus.UNAVAILABLE))
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
