import React from 'react';
import PropTypes from 'prop-types';
import MainPage from "../main-page/main-page";

const App = ({keyNumbers, quantityRentalOffers}) => {
  return (
    <MainPage
      keyNumbers = {keyNumbers}
      quantityRentalOffers = {quantityRentalOffers}
    />
  );
};

App.propTypes = {
  keyNumbers: PropTypes.arrayOf(PropTypes.string.isRequired),
  quantityRentalOffers: PropTypes.number.isRequired
};

export default App;
