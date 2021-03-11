import React, {useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import PropTypes from "prop-types";
import leaflet from 'leaflet';
import "leaflet/dist/leaflet.css";
import roomOfferProp from "../room-screen/room-screen.prop";
import {getCurrentOfferLocation} from "../../store/offer-location/selectors";
import {MapMarkerProperty, MAP_ZOOM} from "../../const";
import mapProp from './map.prop';

const group = leaflet.layerGroup();
const removeMarkers = () => group.clearLayers();

const Map = (props) => {
  const hoverOfferLocation = useSelector(getCurrentOfferLocation);

  const {
    offers,
    currentCity,
    isRoomScreenMap,
    roomScreenOfferLocation,
    roomScreenOfferDescription
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

  const {latitude, longitude} = currentCity;
  const zoom = MAP_ZOOM;

  const createMarker = (location, description, markerIcon) => {
    return leaflet.marker({
      lat: location.latitude,
      lng: location.longitude
    },
    {
      icon: markerIcon
    }).bindPopup(description);
  };

  useEffect(() => {
    removeMarkers();

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

      let marker = createMarker(location, description, iconDefault);

      group.addLayer(marker);
      group.addTo(mapRef.current);
    });

    return () => {
      mapRef.current.remove();
    };
  }, [currentCity]);

  const changeMarkerIcon = () => {
    group.eachLayer((layer) => {
      const {lat, lng} = layer.getLatLng();
      if (lat === hoverOfferLocation.latitude
        && lng === hoverOfferLocation.longitude) {
        layer.setIcon(iconActive);
      } else {
        layer.setIcon(iconDefault);
      }
    });
  };

  useEffect(() => {
    changeMarkerIcon();
  }, [hoverOfferLocation]);

  useEffect(() => {
    if (isRoomScreenMap) {
      let marker = createMarker(roomScreenOfferLocation, roomScreenOfferDescription, iconActive);

      group.addLayer(marker);
      group.addTo(mapRef.current);
    }
  }, []);

  return (
    <div id="map" ref={mapRef} style={{height: `100%`}}/>
  );
};

Map.propTypes = {
  offers: PropTypes.arrayOf(roomOfferProp).isRequired,
  currentCity: mapProp,
  isRoomScreenMap: PropTypes.bool,
  roomScreenOfferLocation: mapProp,
  roomScreenOfferDescription: PropTypes.string
};

export default React.memo(Map);
