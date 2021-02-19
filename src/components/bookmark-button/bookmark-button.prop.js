import PropTypes from 'prop-types';

export default PropTypes.shape({
  buttonClass: PropTypes.string.isRequired,
  iconClass: PropTypes.string.isRequired,
  iconWidth: PropTypes.string.isRequired,
  iconHeight: PropTypes.string.isRequired,
}).isRequired;
