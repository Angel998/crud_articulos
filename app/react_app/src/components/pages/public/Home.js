import React from "react";
import { Link } from "react-router-dom";
import PreviewImage from "../../../public/img/preview.png";

export default function Home() {
  return (
    <React.Fragment>
      <nav className="blue darken-1">
        <div className="container">
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo">
              A2H
            </a>
            <ul id="nav-mobile" className="right">
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main>
        <div className="container">
          <div className="row">
            <div className="col s12">
              <div className="card">
                <div className="card-content">
                  <h5>Vista Previa</h5>
                  <div style={{ height: "20px" }}></div>

                  <img src={PreviewImage} alt="" className="preview" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
}
