import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import offers from './mocks/offers';
import reviews from './mocks/reviews';

const QUANTITY_RENTAL_OFFERS = offers.length;

ReactDOM.render(
    <App
      offres = {offers}
      reviews = {reviews}
      quantityRentalOffers = {QUANTITY_RENTAL_OFFERS}
    />,
    document.querySelector(`#root`)
);
