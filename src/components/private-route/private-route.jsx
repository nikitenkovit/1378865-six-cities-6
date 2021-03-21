import React from "react";
import {useSelector} from 'react-redux';
import {Route, Redirect} from "react-router-dom";
import {AppRoute} from "../../const";
import PropTypes from "prop-types";
import {getIsAuthorized} from "../../store/user/selectors/selectors";

const PrivateRoute = ({render, path, exact}) => {
  const isAuthorized = useSelector(getIsAuthorized);

  return (
    <Route
      path={path}
      exact={exact}
      render={(routeProps) => {
        return (
          isAuthorized
            ? render(routeProps)
            : <Redirect to={AppRoute.LOGIN} />
        );
      }}
    />
  );
};

PrivateRoute.propTypes = {
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
};

export default PrivateRoute;
