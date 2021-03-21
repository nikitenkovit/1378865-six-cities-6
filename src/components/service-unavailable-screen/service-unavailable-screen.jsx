import React from 'react';

const ServiceUnavailableScreen = () => {
  return (
    <div className="page page--favorites-empty">
      <main className="page__main page__main--favorites page__main--favorites-empty">
        <div className="page__favorites-container container">
          <section className="favorites favorites--empty">
            <h1 className="visually-hidden">Service is not available</h1>
            <div className="favorites__status-wrapper">
              <b className="favorites__status">Service is unavailable</b>
              <div className="favorites__status-description">
                <p>
                  Try refreshing the page later
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ServiceUnavailableScreen;
