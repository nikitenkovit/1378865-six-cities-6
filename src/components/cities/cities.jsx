import React from "react";
import {connect} from 'react-redux';
import CityLink from "../city-link/city-link";
import PropTypes from "prop-types";
import {getCities} from "../../store/city/utils";
import {getCurrentCity} from "../../store/city/utils";
import citiesProp from './cities.prop';
import {useDispatch} from "react-redux";
import CityActionCreator from '../../store/city/action-creator';

const Cities = ({cities, currentCity}) => {
  const dispatch = useDispatch();

  const handleCityLinkClick = (evt, city) => {
    evt.preventDefault();

    if (city.name !== currentCity.name) {
      dispatch(CityActionCreator.changeCity(city));
    }
  };

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((city) =>
          <li key={city.name} className="locations__item">
            <CityLink
              city={city}
              isActive={city.name === currentCity.name}
              onCityLinkClick={handleCityLinkClick}
            />
          </li>
        )}
      </ul>
    </section>
  );
};

Cities.propTypes = {
  cities: PropTypes.arrayOf(citiesProp),
  currentCity: citiesProp
};

const mapStateToProps = (state, props) => ({
  ...props,
  cities: getCities(),
  currentCity: getCurrentCity(state),
});

export {Cities};
export default connect(mapStateToProps)(Cities);
