import React from "react";
import {useDispatch, useSelector} from "react-redux";
import CityLink from "../city-link/city-link";
import {getCities, getCurrentCity} from "../../store/cities/selectors";
import CityActionCreator from '../../store/cities/action-creator/action-creator';
import {getIsNeedShowError} from "../../store/offers/selectors/selectors";
import {fetchOfferList} from "../../store/api-actions/fetch-offer-list/fetch-offer-list";

const Cities = () => {
  const dispatch = useDispatch();

  const cities = useSelector(getCities);
  const currentCity = useSelector(getCurrentCity);
  const needFetchOffers = useSelector(getIsNeedShowError);

  const handleCityLinkClick = (evt, city) => {
    evt.preventDefault();
    if (city.name !== currentCity.name) {
      dispatch(CityActionCreator.changeCity(city));
    }
    if (needFetchOffers) {
      dispatch(fetchOfferList());
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
