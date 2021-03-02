import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Switch, Route} from 'react-router-dom';
import MainScreen from "../main-screen/main-screen";
import SignInScreen from "../sign-in-screen/sign-in-screen";
import FavoritesScreen from "../favorites-screen/favorites-screen";
import RoomScreen from "../room-screen/room-screen";
import NotFoundScreen from "../not-found-screen/not-found-screen";
import FavoritesEmptyScreen from "../favorites-empty-screen/favorites-empty-screen";
import roomOfferProp from '../room-screen/room-screen.prop';
import {getOffersByCity} from "../../store/offers/offers-utils";
import PrivateRoute from '../private-route/private-route';
import {getAuthorizationStatus} from "../../store/user/selectors";

const App = ({offers, authorizationStatus}) => {
  return (
    <Switch>
      <Route exact path="/">
        <MainScreen/>
      </Route>
      <Route exact path="/login">
        <SignInScreen authorizationStatus={authorizationStatus}/>
      </Route>
      <PrivateRoute exact path="/favorites" component={FavoritesScreen} authorizationStatus={authorizationStatus}/>
      <Route exact path="/offer/:id"
        render={(renderProps) => {
          const id = renderProps.match.params.id;
          const offer = offers.find((room) => room.id.toString() === id);

          const nearestOffers = offers.slice(0, 3); // временные моки для ближайшых трёх предложений

          return offer
            ? <RoomScreen offer={offer} nearestOffers={nearestOffers} reviews={[]}/>
            : <NotFoundScreen
            />;
        }}
      />
      <Route exact path="/favorites_empty" component={FavoritesEmptyScreen}/>
      <Route path="*" component={NotFoundScreen}/>
    </Switch>
  );
};

App.propTypes = {
  offers: PropTypes.arrayOf(roomOfferProp).isRequired,
  authorizationStatus: PropTypes.string.isRequired
};

const mapStateToProps = (state, props) => ({
  ...props,
  offers: getOffersByCity(state),
  authorizationStatus: getAuthorizationStatus(state)
});

export {App};
export default connect(mapStateToProps)(App);
