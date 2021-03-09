import React from "react";
import {useDispatch, useSelector} from "react-redux";
import CityLink from "../city-link/city-link";
import {getCities, getCurrentCity} from "../../store/cities/selectors";
import CityActionCreator from '../../store/cities/action-creator';

const Cities = () => {
  const dispatch = useDispatch();

  const cities = useSelector(getCities);
  const currentCity = useSelector(getCurrentCity);

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

export default React.memo(Cities);
