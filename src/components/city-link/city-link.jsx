import React from "react";
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import CityActionCreator from '../../store/city/action-creator';
import citiesProp from "../cities/cities.prop";

const CityLink = (props) => {
  const {
    city,
    isActive,
    currentCity,
    onClick
  } = props;

  const handleCityLinkClick = (evt) => {
    evt.preventDefault();

    if (city.name !== currentCity.name) {
      onClick(city);
    }
  };

  return (
    <a
      className={`locations__item-link tabs__item ${isActive && `tabs__item--active`}`}
      href="#"
      onClick={handleCityLinkClick}
    >
      <span>{city.name}</span>
    </a>
  );
};

CityLink.propTypes = {
  city: citiesProp,
  isActive: PropTypes.bool.isRequired,
  currentCity: citiesProp,
  onClick: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) =>({
  onClick: (city) => dispatch(CityActionCreator.changeCity(city))
});

export {CityLink};
export default connect(null, mapDispatchToProps)(CityLink);
