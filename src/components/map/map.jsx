import React, {useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import leaflet from 'leaflet';
import "leaflet/dist/leaflet.css";
import {getOffersByCity} from "../../utils/common";
import {getCurrentCity} from "../../store/city/utils";
import PropTypes from "prop-types";
import roomOfferProp from "../room-screen/room-screen.prop";
import citiesProp from "../cities/cities.prop";
import {getCurrentOfferLocation} from "../../store/offer-location/utils";
import {MapMarkerProperty} from "../../const";
import mapProp from './map.prop';

const group = leaflet.layerGroup();

const Map = (props) => {
  const {currentCity,
    offers,
    hoverOfferLocation,

  } = props;

  const points = offers.map((offer) => {
    return {
      location: offer.location,
      description: offer.description
    };
  });

  let mapRef = useRef();

  const iconDefault = leaflet.icon(MapMarkerProperty.DEFAULT);
  const iconActive = leaflet.icon(MapMarkerProperty.ACTIVE);

  const {latitude, longitude, zoom} = currentCity.location;

  // Делаем единую функцию рисования маркеров
  const addMarkers = () => {
    points.forEach((point) => {
      const {location, description} = point;


      // тут решаем какой маркер нам нужен.
      const icon = (
        location.latitude === hoverOfferLocation.latitude
        && location.longitude === hoverOfferLocation.longitude
      ) ? iconActive : iconDefault;

      // создаем маркер
      const marker = leaflet.marker({
        lat: location.latitude,
        lng: location.longitude
      },
      {
        icon
      }).bindPopup(description);

      group.addLayer(marker);
      group.addTo(mapRef.current);
    });
  };

  // Функция удаления маркеров - не сделал.
  const removeMarkers = () => {};

  useEffect(() => {
    mapRef.current = leaflet.map(`map`, {
      center: [latitude, longitude],
      zoom,
      zoomControl: false,
      marker: true
    }).setView([latitude, longitude], zoom);

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(mapRef.current);

    addMarkers();

    return () => {
      mapRef.current.remove();
    };
  }, [currentCity]);

  // при смене наведенного города - вызываем перерисовку маркеров
  useEffect(() => {
    removeMarkers();
    addMarkers();
  }, [hoverOfferLocation]);

  return (
    <div id="map" ref={mapRef} style={{height: `100%`}}/>
  );
};

Map.propTypes = {
  offers: PropTypes.arrayOf(roomOfferProp).isRequired,
  currentCity: citiesProp,
  hoverOfferLocation: mapProp,
  isRoomScreenMap: PropTypes.bool,
  roomScreenOfferLocation: mapProp,
  roomScreenOfferDescription: PropTypes.string
};

const mapStateToProps = (state, props) => ({
  ...props,
  currentCity: getCurrentCity(state),
  offers: getOffersByCity(state),
  hoverOfferLocation: getCurrentOfferLocation(state)
});

export {Map};
export default connect(mapStateToProps)(Map);
