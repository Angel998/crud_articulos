import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  initMaterialComponents,
  removeMaterialComponents
} from "../../../utils/materialFunctions";

import { loginUser } from "../../../actions/authActions";

import TextInput from "../../common/inputs/inputField";
import Spinner from "../../common/loaders/spinner";

class Login extends Component {
  state = {
    user: "",
    password: "",
    errors: {}
  };

  componentDidMount() {
    initMaterialComponents();
    if (this.props.auth.isLoggedIn) {
      this.props.history.push("/articulos");
    }
  }

  componentWillUnmount() {
    removeMaterialComponents();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error.errors) {
      this.setState({ errors: nextProps.error.errors });
    }
  }

  onChangeTextInput = e => this.setState({ [e.target.name]: e.target.value });

  onLoginClick = () => {
    const { user, password } = this.state;
    this.props.loginUser({ user, password }, this.props.history);
  };

  getLoginCard = () => {
    const {
      user,
      password,
      errors: { user_error, password_error }
    } = this.state;
    return (
      <div className="card login-card hoverable">
        <div className="card-content">
          <h5 className="text-center">Inicio de sesion</h5>
          <div className="row">
            <TextInput
              id="user"
              label="Usuario o correo electronico"
              value={user}
              required={true}
              onChange={this.onChangeTextInput}
              error={user_error}
            />
          </div>

          <div className="row">
            <TextInput
              id="password"
              label="Clave"
              type="password"
              required={true}
              value={password}
              onChange={this.onChangeTextInput}
              error={password_error}
            />
          </div>
          {this.props.auth.loading && <Spinner />}
          <button className="btn" onClick={this.onLoginClick}>
            Aceptar
          </button>
          <Link
            className="btn-flat w-100 text-center"
            to="/"
            style={{ marginTop: "10px" }}
          >
            Inicio
          </Link>
        </div>
      </div>
    );
  };

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col s12">{this.getLoginCard()}</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Login.propTypes = {
  auth: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
