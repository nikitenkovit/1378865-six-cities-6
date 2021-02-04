import React from 'react';
import PropTypes from 'prop-types';
import MainPage from "../main-page/main-page";

const App = ({placeCardsIds, quantityRentalOffers}) => {
  return (
    <MainPage
      placeCardsIds = {placeCardsIds}
      quantityRentalOffers = {quantityRentalOffers}
    />
  );
};

App.propTypes = {
  placeCardsIds: PropTypes.arrayOf(PropTypes.string.isRequired),
  quantityRentalOffers: PropTypes.number.isRequired
};

export default App;
