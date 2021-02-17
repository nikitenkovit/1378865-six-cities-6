import React from 'react';
import PropTypes from 'prop-types';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import MainScreen from "../main-screen/main-screen";
import SignInScreen from "../sign-in-screen/sign-in-screen";
import FavoritesScreen from "../favorites-screen/favorites-screen";
import RoomScreen from "../room-screen/room-screen";
import NotFoundScreen from "../not-found-screen/not-found-screen";
import FavoritesEmptyScreen from "../favorites-empty-screen/favorites-empty-screen";
import roomOfferProp from '../room-screen/room-offer-prop';
import reviewProp from '../review/review-prop';

const App = ({offers, reviews, quantityRentalOffers}) => {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <MainScreen
            offers={offers}
            quantityRentalOffers={quantityRentalOffers}
          />
        </Route>
        <Route exact path="/login">
          <SignInScreen/>
        </Route>
        <Route exact path="/favorites">
          <FavoritesScreen
            offers={offers}
          />
        </Route>
        <Route exact path="/offer/:id"
          render={(renderProps) => {
            const id = renderProps.match.params.id;
            const offer = offers.find((room) => room.id.toString() === id);

            const nearestOffers = offers.slice(0, 3); // временные моки для ближайшых трёх предложений

            return offer ? <RoomScreen offer={offer} reviews={reviews} nearestOffers={nearestOffers}/> : <NotFoundScreen/>;
          }}
        />
        <Route exact path="/favorites_empty">
          <FavoritesEmptyScreen/>
        </Route>
        <Route path="*" component={NotFoundScreen}/>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  offers: PropTypes.arrayOf(roomOfferProp).isRequired,
  reviews: PropTypes.arrayOf(reviewProp).isRequired,
  quantityRentalOffers: PropTypes.number.isRequired
};
RoomScreen.propTypes = {
  offer: roomOfferProp,
  reviews: PropTypes.arrayOf(reviewProp).isRequired,
  nearestOffers: PropTypes.arrayOf(roomOfferProp)
};
MainScreen.propTypes = {
  offers: PropTypes.arrayOf(roomOfferProp).isRequired,
  quantityRentalOffers: PropTypes.number.isRequired
};
FavoritesScreen.propTypes = {
  offers: PropTypes.arrayOf(roomOfferProp).isRequired
};

export default App;
