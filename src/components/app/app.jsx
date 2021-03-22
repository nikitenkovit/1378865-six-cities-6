import React from 'react';
import {useSelector} from 'react-redux';
import {Switch, Route} from 'react-router-dom';
import MainScreen from "../main-screen/main-screen";
import SignInScreen from "../sign-in-screen/sign-in-screen";
import FavoritesScreen from "../favorites-screen/favorites-screen";
import RoomScreen from "../room-screen/room-screen";
import NotFoundScreen from "../not-found-screen/not-found-screen";
import PrivateRoute from '../private-route/private-route';
import {AppRoute} from "../../const";
import {getIsNeedShowSpiner} from "../../store/user/selectors/selectors";
import SpinerScreen from "../spiner-screen/spiner-screen";

const App = () => {
  const needShowSpiner = useSelector(getIsNeedShowSpiner);

  if (needShowSpiner) {
    return (
      <SpinerScreen/>
    );
  }

  return (
    <Switch>
      <Route exact path={AppRoute.MAIN} component={MainScreen}/>
      <Route exact path={AppRoute.LOGIN} component={SignInScreen}/>
      <PrivateRoute
        exact
        path={AppRoute.FAVORITES}
        render={() => {
          return (
            <FavoritesScreen/>
          );
        }}/>
      <Route exact path={AppRoute.ROOM} component={RoomScreen}/>
      <Route path="*" component={NotFoundScreen}/>
    </Switch>
  );
};

export default App;
