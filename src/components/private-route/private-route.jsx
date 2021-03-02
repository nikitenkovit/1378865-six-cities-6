import React from "react";
import {Route, Redirect} from "react-router-dom";
import {AuthorizationStatus} from "../../const";
import PropTypes from "prop-types";

const PrivateRoute = ({component: Component, authorizationStatus, ...rest}) => (
  <Route
    {...rest}
    render={(props) =>
      authorizationStatus === AuthorizationStatus.AUTH
        ? <Component {...props} />
        : <Redirect to="/login"/>
    }
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.object,
  authorizationStatus: PropTypes.string
};

export default PrivateRoute;
