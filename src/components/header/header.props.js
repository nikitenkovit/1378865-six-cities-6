import PropTypes from 'prop-types';

export default PropTypes.shape({
  avatarUrl: PropTypes.string,
  email: PropTypes.string,
  id: PropTypes.number,
  isPro: PropTypes.bool,
  name: PropTypes.string
});
