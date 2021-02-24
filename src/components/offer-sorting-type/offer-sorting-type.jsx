import React from "react";
import {SortingType} from "../../const";
import PropTypes from "prop-types";

const OfferSortingType = ({type, onSelectType, isActive}) => {
  return (
    <li className={`places__option " tabIndex="0"
    ${isActive ? `places__option--active` : null}`}
    onClick={() => onSelectType(type)}
    >
      {SortingType[type]}
    </li>
  );
};

OfferSortingType.propTypes = {
  type: PropTypes.string.isRequired,
  onSelectType: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired
};

export default OfferSortingType;