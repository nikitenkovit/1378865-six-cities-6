import PropTypes from 'prop-types';

export default PropTypes.shape({
  articleClass: PropTypes.string.isRequired,
  wrapperClass: PropTypes.string.isRequired,
  infoClass: PropTypes.string.isRequired
}).isRequired;
