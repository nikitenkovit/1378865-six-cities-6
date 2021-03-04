import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Router, Switch, Route} from 'react-router-dom';
import MainScreen from "../main-screen/main-screen";
import SignInScreen from "../sign-in-screen/sign-in-screen";
import FavoritesScreen from "../favorites-screen/favorites-screen";
import RoomScreen from "../room-screen/room-screen";
import NotFoundScreen from "../not-found-screen/not-found-screen";
import roomOfferProp from '../room-screen/room-screen.prop';
import PrivateRoute from '../private-route/private-route';
import {getAuthorizationStatus} from "../../store/user/selectors";
import browserHistory from "../../history";

const App = ({authorizationStatus}) => {
  return (
    <Router history={browserHistory}>
      <Switch>
        <Route exact path="/">
          <MainScreen/>
        </Route>
        <Route exact path="/login">
          <SignInScreen authorizationStatus={authorizationStatus}/>
        </Route>
        <PrivateRoute exact path="/favorites" component={FavoritesScreen}/>
        <Route exact path="/offer/:id" component={RoomScreen}/>
        <Route path="*" component={NotFoundScreen}/>
      </Switch>
    </Router>
  );
};

App.propTypes = {
  offers: PropTypes.arrayOf(roomOfferProp).isRequired,
  authorizationStatus: PropTypes.string.isRequired
};

const mapStateToProps = (state, props) => ({
  ...props,
  offers: state.OFFERS.items,
  authorizationStatus: getAuthorizationStatus(state),
});

export {App};
export default connect(mapStateToProps)(App);
