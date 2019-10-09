import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({
  component: Component,
  auth,
  forAdmin,
  pasive,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      auth.isLoggedIn === true ? (
        forAdmin ? (
          auth.user.admin ? (
            <Component {...props} />
          ) : (
            <Redirect to="/login" />
          )
        ) : (
          <Component {...props} />
        )
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
  forAdmin: PropTypes.bool.isRequired
};

PrivateRoute.defaultProps = {
  auth: { isLoggedIn: false },
  forAdmin: false
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
