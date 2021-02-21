import React from "react";
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import CityActionCreator from '../../store/city/action-creator';
import {getCurrentCity} from "../../utils/common";
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

const mapStateToProps = (state, props) => ({
  ...props,
  currentCity: getCurrentCity(state),
});

const mapDispatchToProps = (dispatch) =>({
  onClick: (city) => dispatch(CityActionCreator.changeCity(city))
});

export {CityLink};
export default connect(mapStateToProps, mapDispatchToProps)(CityLink);
