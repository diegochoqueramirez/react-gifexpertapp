import React from 'react';
import { Redirect, Route } from 'react-router';
import PropTypes from 'prop-types';

export const PrivateRoute = ({ logged, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) =>
        logged ? <Component {...props} /> : <Redirect to='/auth/login' />
      }
    />
  );
};

PrivateRoute.propTypes = {
  logged: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};
