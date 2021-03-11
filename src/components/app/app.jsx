import React from 'react';
import {Router, Switch, Route} from 'react-router-dom';
import MainScreen from "../main-screen/main-screen";
import SignInScreen from "../sign-in-screen/sign-in-screen";
import FavoritesScreen from "../favorites-screen/favorites-screen";
import RoomScreen from "../room-screen/room-screen";
import NotFoundScreen from "../not-found-screen/not-found-screen";
import PrivateRoute from '../private-route/private-route';
import browserHistory from "../../history";
import {AppRoute} from "../../const";

const App = () => {
  return (
    <Router history={browserHistory}>
      <Switch>
        <Route exact path={AppRoute.MAIN} component={MainScreen}/>
        <Route exact path={AppRoute.LOGIN} component={SignInScreen} />
        <PrivateRoute exact path={AppRoute.FAVORITES} component={FavoritesScreen}/>
        <Route exact path={AppRoute.ROOM} component={RoomScreen}/>
        <Route path="*" component={NotFoundScreen}/>
      </Switch>
    </Router>
  );
};

export default App;
