import React, {useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import leaflet from 'leaflet';
import "leaflet/dist/leaflet.css";
import {getOffersByCity} from "../../utils/common";
import {getCurrentCity} from "../../store/city/utils";
import PropTypes from "prop-types";
import roomOfferProp from "../room-screen/room-screen.prop";
import citiesProp from "../cities/cities.prop";

const Map = (props) => {
  const {currentCity, offers} = props;

  const points = offers.map((offer) => {
    return {
      location: offer.location,
      description: offer.description
    };
  });

  let mapRef = useRef();

  const icon = leaflet.icon({
    iconUrl: `img/pin.svg`,
    iconSize: [30, 30]
  });

  const {latitude, longitude, zoom} = currentCity.location;

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

    points.forEach((point) => {

      const {location, description} = point;

      leaflet.marker({
        lat: location.latitude,
        lng: location.longitude
      },
      {
        icon
      })
        .addTo(mapRef.current)
        .bindPopup(description);
    });
    return () => {
      mapRef.current.remove();
    };
  }, [currentCity]);

  return (
    <div id="map" ref={mapRef} style={{height: `100%`}}/>
  );
};

Map.propTypes = {
  offers: PropTypes.arrayOf(roomOfferProp).isRequired,
  currentCity: citiesProp
};

const mapStateToProps = (state, props) => ({
  ...props,
  currentCity: getCurrentCity(state),
  offers: getOffersByCity(state)
});

export {Map};
export default connect(mapStateToProps)(Map);
