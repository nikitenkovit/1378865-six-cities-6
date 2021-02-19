import React, {useEffect, useRef} from 'react';
import leaflet from 'leaflet';
import mapProp from './map.prop';

import "leaflet/dist/leaflet.css";

const Map = ({city, points}) => {
  const mapRef = useRef();

  const {latitude, longitude, zoom} = city;

  const icon = leaflet.icon({
    iconUrl: `img/pin.svg`,
    iconSize: [30, 30]
  });

  useEffect(() => {

    mapRef.current.style.height = `100%`;

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

      return () => {
        mapRef.current.remove();
      };
    });
  }, []);

  return (
    <div id="map" ref={mapRef}/>
  );
};

Map.propTypes = {
  city: mapProp.city,
  points: mapProp.points
};

export default Map;
