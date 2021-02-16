import PropTypes from 'prop-types';

export default PropTypes.arrayOf(PropTypes.shape({
  location: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    zoom: PropTypes.number.isRequired
  }),
  description: PropTypes.string.isRequired
})).isRequired;
