import React from 'react';
import {useSelector} from 'react-redux';
import Header from "../header/header";
import Cities from "../cities/cities";
import CitiesPlaces from "../cities-places/cities-places";
import SpinerScreen from "../spiner-screen/spiner-screen";
import CitiesNoPlaces from "../cities-no-places/cities-no-places";
import {getIsNeedShowSpiner, getIsNeedShowError} from "../../store/offers/selectors/selectors";
import ServiceUnavailableScreen from "../service-unavailable-screen/service-unavailable-screen";
import {getIsNeedShowServiceUnavailableScreen} from "../../store/service-available-status/selectors/selectors";

const MainScreen = () => {
  const needShowServiceUnavailableScreen = useSelector(getIsNeedShowServiceUnavailableScreen);
  const needShowSpinner = useSelector(getIsNeedShowSpiner);
  const needShowCitiesNoPlaces = useSelector(getIsNeedShowError);

  if (needShowServiceUnavailableScreen) {
    return (
      <ServiceUnavailableScreen/>
    );
  } else if (needShowSpinner) {
    return (
      <SpinerScreen/>
    );
  }

  return (
    <div className={`page page--gray page--main ${needShowCitiesNoPlaces ? `page__main--index-empty` : ``}`}>
      <Header/>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <Cities/>
        </div>
        {needShowCitiesNoPlaces ? <CitiesNoPlaces/> : <CitiesPlaces/>}
      </main>
    </div>
  );
};

export default React.memo(MainScreen);
