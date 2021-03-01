import React from 'react';
import {Link} from 'react-router-dom';

const ServiceIsUnavailableScreen = () => {
  return (
    <div className="page page--favorites-empty">
      <main className="page__main page__main--favorites page__main--favorites-empty">
        <div className="page__favorites-container container">
          <section className="favorites favorites--empty">
            <h1 className="visually-hidden">Favorites (empty)</h1>
            <div className="favorites__status-wrapper">
              <b className="favorites__status">Service is unavailable</b>
              <p className="favorites__status-description">
                <p>
                  Try refreshing the page later
                </p>
              </p>
            </div>
          </section>
        </div>
      </main>
      <footer className="footer">
        <Link className="footer__logo-link" to="/">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </Link>
      </footer>
    </div>
  );
};

export default ServiceIsUnavailableScreen;
