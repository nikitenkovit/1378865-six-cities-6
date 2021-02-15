import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import offersData from './mocks/offersData';
import reviewsData from './mocks/reviews';
import {adaptCommentsData, adaptOfferData} from "./utils/common";

const offers = offersData.map(adaptOfferData);
const reviews = reviewsData.map(adaptCommentsData);
const quantityRentalOffers = offers.length;

ReactDOM.render(
    <App
      offers = {offers}
      reviews = {reviews}
      quantityRentalOffers = {quantityRentalOffers}
    />,
    document.querySelector(`#root`)
);
