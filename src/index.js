import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {generateId, getRandomInteger} from "./utils/common";

const PLACE_CARDS_COUNT = 5;
const placeCardsIds = new Array(PLACE_CARDS_COUNT).fill().map(generateId);

const Setting = {
  KEY_NUMBERS: placeCardsIds,
  QUANTITY_RENTAL_OFFERS: getRandomInteger(10, 500)
};

ReactDOM.render(
    <App
      placeCardsIds = {Setting.KEY_NUMBERS}
      quantityRentalOffers = {Setting.QUANTITY_RENTAL_OFFERS}
    />,
    document.querySelector(`#root`)
);
