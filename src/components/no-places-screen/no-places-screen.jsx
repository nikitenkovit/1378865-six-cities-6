import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import Header from "../header/header";
import Cities from "../cities/cities";
import {getCurrentCity} from "../../store/cities/selectors";
import {getIsNeedShowError} from "../../store/offers/selectors";
import RedirectActionCreator from "../../store/middlewares/action-creator";
import {AppRoute} from "../../const";

const NoPlacesScreen = () => {
  const dispatch = useDispatch();

  const currentCity = useSelector(getCurrentCity);
  const needShowError = useSelector(getIsNeedShowError);

  if (!needShowError) {
    dispatch(RedirectActionCreator.redirectToRoute(AppRoute.MAIN));
  }

  return (
    <div className="page page--gray page--main">
      <Header/>

      <main className="page__main page__main--index page__main--index-empty">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <Cities/>
        </div>
        <div className="cities">
          <div className="cities__places-container cities__places-container--empty container">
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">No places to stay available</b>
                <p className="cities__status-description">{`We could not find any property available at the moment in
                  ${currentCity.name}`}</p>
              </div>
            </section>
            <div className="cities__right-section"/>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NoPlacesScreen;
