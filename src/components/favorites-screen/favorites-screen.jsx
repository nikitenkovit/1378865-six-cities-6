import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import FavoritesCityItem from "../favorites-city-item/favorites-city-item";
import Header from "../header/header";
import {getIsNeedShowSpiner, getFavoriteOffers, getIsNeedShowEmptyScreen} from "../../store/favorites/selectors";
import SpinerScreen from "../spiner-screen/spiner-screen";
import {fetchFavoriteOffers} from "../../store/api-actions";
import FavoritesEmptyScreen from "../favorites-empty-screen/favorites-empty-screen";
import {AppRoute} from "../../const";

const FavoritesScreen = () => {
  const dispatch = useDispatch();

  const needShowSpinner = useSelector(getIsNeedShowSpiner);
  const favoriteOffers = useSelector(getFavoriteOffers);
  const needShowEmptyScreen = useSelector(getIsNeedShowEmptyScreen);

  useEffect(() => {
    dispatch(fetchFavoriteOffers());
  }, []);

  if (needShowSpinner) {
    return (
      <SpinerScreen/>
    );
  } else if (needShowEmptyScreen) {
    return (
      <FavoritesEmptyScreen/>
    );
  }

  return (
    <div className="page">
      <Header isFavoriteScreen={true}/>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {favoriteOffers.map(([cityName, cityOffers]) =>
                <FavoritesCityItem
                  key={cityName}
                  cityName={cityName}
                  cityOffers={cityOffers}
                />
              )}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.MAIN}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </Link>
      </footer>
    </div>
  );
};

export default FavoritesScreen;
