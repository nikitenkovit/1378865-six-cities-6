import PropTypes from 'prop-types';

export default PropTypes.shape({
  location: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    zoom: PropTypes.number
  })
});
