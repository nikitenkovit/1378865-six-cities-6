import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import MainScreen from "../main-screen/main-screen";
import SignInScreen from "../sign-in-screen/sign-in-screen";
import FavoritesScreen from "../favorites-screen/favorites-screen";
import RoomScreen from "../room-screen/room-screen";
import NotFoundScreen from "../not-found-screen/not-found-screen";
import FavoritesEmptyScreen from "../favorites-empty-screen/favorites-empty-screen";
import roomOfferProp from '../room-screen/room-screen.prop';
import reviewProp from '../review/review.prop';
import {getOffersByCity} from "../../utils/common";

const App = ({reviews, offers}) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={MainScreen}/>
        <Route exact path="/login" component={SignInScreen}/>
        <Route exact path="/favorites" component={FavoritesScreen}/>
        <Route exact path="/offer/:id"
          render={(renderProps) => {
            const id = renderProps.match.params.id;
            const offer = offers.find((room) => room.id.toString() === id);

            const nearestOffers = offers.slice(0, 3); // временные моки для ближайшых трёх предложений

            return offer ? <RoomScreen offer={offer} reviews={reviews} nearestOffers={nearestOffers}/> : <NotFoundScreen/>;
          }}
        />
        <Route exact path="/favorites_empty" component={FavoritesEmptyScreen}/>
        <Route path="*" component={NotFoundScreen}/>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  offers: PropTypes.arrayOf(roomOfferProp).isRequired,
  reviews: PropTypes.arrayOf(reviewProp).isRequired,
};

const mapStateToProps = (state, props) => ({
  ...props,
  offers: getOffersByCity(state.CITY.city)
});

export {App};
export default connect(mapStateToProps)(App);
