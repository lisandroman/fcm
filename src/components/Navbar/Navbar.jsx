import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { allData } from "../../redux/state/orders";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const orderAllData = useSelector(allData);
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
          <ul className="navbar-nav align-items-center">
            <li className="nav-item ">
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
            <Link className="nav-link" to="/cart">
              <button type="button" className="btn btn-primary">
                <FaShoppingCart />{" "}
                <span className="badge text-bg-danger ms-1">
                  {orderAllData.length}
                </span>
              </button>
            </Link>
            {/* <li className="nav-item">
              <Link className="nav-link" to="/cart">
                Cart
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
