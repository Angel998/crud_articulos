import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { logoutUser } from "../../../actions/authActions";

class Navbar extends Component {
  onLogOut = () => {
    this.props.logoutUser();
  };

  render() {
    return (
      <nav className="blue darken-1">
        <div className="container">
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo">
              A2H
            </a>
            <ul id="nav-mobile" className="right">
              <li>
                <Link to="/articulos">Articulos</Link>
              </li>
              <li>
                <Link to="/nuevo_articulo">Nuevo</Link>
              </li>
              <li>
                <a href="#!" onClick={this.onLogOut}>
                  <i className="material-icons">exit_to_app</i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default connect(
  null,
  { logoutUser }
)(Navbar);
