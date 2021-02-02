import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {generateId, getRandomInteger} from "./utils/common";

const PLACE_CARDS_COUNTER = 5;
const keyNumbers = new Array(PLACE_CARDS_COUNTER).fill().map(generateId);

const setting = {
  KEY_NUMBERS: keyNumbers,
  QUANTITY_RENTAL_OFFERS: getRandomInteger(10, 500)
};

ReactDOM.render(
    <App
      keyNumbers = {setting.KEY_NUMBERS}
      quantityRentalOffers = {setting.QUANTITY_RENTAL_OFFERS}
    />,
    document.querySelector(`#root`)
);
