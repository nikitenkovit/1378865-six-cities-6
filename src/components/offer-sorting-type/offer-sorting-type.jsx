import React from "react";
import PropTypes from "prop-types";

const OfferSortingType = ({type, onSelectType, isActive}) => {
  return (
    <li className={`places__option ${isActive ? `places__option--active` : null}`}
      onClick={() => onSelectType(type)}
      tabIndex="0"
    >
      {type}
    </li>
  );
};

OfferSortingType.propTypes = {
  type: PropTypes.string.isRequired,
  onSelectType: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired
};

export default OfferSortingType;
