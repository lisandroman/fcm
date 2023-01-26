import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            FUTCOINS<b>MARKET</b>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/buy">
                  Coins Packages
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/sell">
                  Sell
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/buy-players">
                  Players Prices
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/help">
                  Help Center
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  Cart
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
  );
};

export default Navbar;
