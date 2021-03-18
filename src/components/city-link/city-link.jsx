import React from "react";
import PropTypes from "prop-types";
import citiesProp from "../cities/cities.prop";

const CityLink = (props) => {
  const {
    city,
    isActive,
    onCityLinkClick
  } = props;

  return (
    <a
      className={`locations__item-link tabs__item ${isActive && `tabs__item--active`}`}
      href="#"
      onClick={(evt) => {
        onCityLinkClick(evt, city);
      }}
    >
      <span>{city.name}</span>
    </a>
  );
};

CityLink.propTypes = {
  city: citiesProp,
  isActive: PropTypes.bool.isRequired,
  onCityLinkClick: PropTypes.func
};

export default CityLink;
