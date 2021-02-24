import React, {useState} from "react";
import {SortingType, DEFAULT_SORTING_TYPE} from "../../const";
import OfferSortingType from "../offer-sorting-type/offer-sorting-type";
import PropTypes from "prop-types";

const OfferSorting = ({onSortChange, activeType}) => {
  const [isOpenedSorting, setIsOpenedSorting] = useState(false);

  const onSelectType = (type) => {
    onSortChange(type);
    setIsOpenedSorting(!activeType);
  };

  return (<form className="places__sorting" action="#" method="get">
    <span className="places__sorting-caption">Sort by </span>
    <span className="places__sorting-type" tabIndex="0" onClick={() => setIsOpenedSorting(!isOpenedSorting)}>
      {SortingType[activeType] || DEFAULT_SORTING_TYPE}
      <svg className="places__sorting-arrow" width="7" height="4">
        <use xlinkHref="#icon-arrow-select"/>
      </svg>
    </span>
    <ul className={`places__options places__options--custom
    ${isOpenedSorting ? `places__options--opened` : null}`}>
      {Object.keys(SortingType).map((type) =>
        <OfferSortingType
          key={`sorting-type-${type}`}
          type={type}
          onSelectType={onSelectType}
          isActive={activeType === type}
        />)}
    </ul>
  </form>);
};

OfferSorting.propTypes = {
  activeType: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired
};

export default OfferSorting;
