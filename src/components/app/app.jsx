import React from 'react';
import PropTypes from 'prop-types';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import MainScreen from "../main-screen/main-screen";
import SignInScreen from "../sign-in-screen/sign-in-screen";
import FavoritesScreen from "../favorites-screen/favorites-screen";
import RoomScreen from "../room-screen/room-screen";
import NotFoundScreen from "../not-found-screen/not-found-screen";

const App = ({placeCardsIds, quantityRentalOffers}) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <MainScreen
            quantityRentalOffers={quantityRentalOffers}
            placeCardsIds={placeCardsIds}
          />
        </Route>
        <Route exact path="/login" component={SignInScreen}/>
        <Route exact path="/favorites" component={FavoritesScreen}/>
        <Route exact path="/offer/:id" component={RoomScreen}/>
        <Route path="*" component={NotFoundScreen}/>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  placeCardsIds: PropTypes.arrayOf(PropTypes.string.isRequired),
  quantityRentalOffers: PropTypes.number.isRequired
};

export default App;
