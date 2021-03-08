import React from "react";
import {useSelector} from 'react-redux';
import {Route, Redirect} from "react-router-dom";
import {AuthorizationStatus, AppRoute} from "../../const";
import PropTypes from "prop-types";
import {getAuthorizationStatus} from "../../store/user/selectors";

const PrivateRoute = ({component: Component, ...rest}) => {
  const authorizationStatus = useSelector(getAuthorizationStatus);

  return <Route
    {...rest}
    render={(props) =>
      authorizationStatus === AuthorizationStatus.AUTH
        ? <Component {...props} />
        : <Redirect to={AppRoute.LOGIN}/>
    }
  />;
};

PrivateRoute.propTypes = {
  component: PropTypes.func
};

export default PrivateRoute;
