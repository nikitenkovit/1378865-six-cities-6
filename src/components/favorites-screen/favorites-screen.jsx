import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import FavoritesCityItem from "../favorites-city-item/favorites-city-item";
import Header from "../header/header";
import {getIsNeedShowSpiner, getFavoriteOffers, getIsNeedShowEmptyScreen} from "../../store/favorites/selectors/selectors";
import SpinerScreen from "../spiner-screen/spiner-screen";
import {fetchFavoriteOffers} from "../../store/api-actions/fetch-favorite-offers/fetch-favorite-offers";
import FavoritesEmptyScreen from "../favorites-empty-screen/favorites-empty-screen";
import ServiceUnavailableScreen from "../service-unavailable-screen/service-unavailable-screen";
import {AppRoute} from "../../const";
import {getIsNeedShowServiceUnavailableScreen} from "../../store/service-available-status/selectors/selectors";

const FavoritesScreen = () => {
  const dispatch = useDispatch();

  const needShowServiceUnavailableScreen = useSelector(getIsNeedShowServiceUnavailableScreen);
  const needShowSpinner = useSelector(getIsNeedShowSpiner);
  const favoriteOffers = useSelector(getFavoriteOffers);
  const needShowEmptyScreen = useSelector(getIsNeedShowEmptyScreen);

  useEffect(() => {
    dispatch(fetchFavoriteOffers());
  }, []);

  if (needShowServiceUnavailableScreen) {
    return (
      <ServiceUnavailableScreen/>
    );
  } else if (needShowSpinner) {
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
