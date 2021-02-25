import PropTypes from 'prop-types';

export default PropTypes.shape({
  location: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    zoom: PropTypes.number.isRequired
  }),
  name: PropTypes.string.isRequired
}).isRequired;
