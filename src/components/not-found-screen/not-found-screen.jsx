import React from 'react';
import {Link} from 'react-router-dom';
import Header from "../header/header";
import {AppRoute} from "../../const";

const NotFoundScreen = () => {
  return (
    <div className="page page--favorites-empty">
      <Header/>

      <main className="page__main page__main--favorites page__main--favorites-empty">
        <div className="page__favorites-container container">
          <section className="favorites favorites--empty">
            <h1 className="visually-hidden">Page not found</h1>
            <div className="favorites__status-wrapper">
              <b className="favorites__status">404. Page not found</b>
              <p className="favorites__status-description">
                <Link className="error-link" style={{color: `#4481c3`, fontWeight: `bold`}} to="/">
                  Go back to the home page
                </Link>
              </p>
            </div>
          </section>
        </div>
      </main>
      <footer className="footer">
        <Link className="footer__logo-link" to={AppRoute.MAIN}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </Link>
      </footer>
    </div>
  );
};

export default NotFoundScreen;
