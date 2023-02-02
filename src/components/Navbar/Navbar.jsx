import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { allData } from "../../redux/state/orders";
import { FaShoppingCart } from "react-icons/fa";
import styled from "styled-components";
import logo from "../../assets/images/logo2.png"

const Navbar = () => {
  const orderAllData = useSelector(allData);

  return (
    <NavbarStyled>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            {/* FUTCOINS<b>MARKET</b> */}
            <img src={logo} alt="logo" className="ms-xs-1" width="250" height="88" />
          </a>
          <button
            className="navbar-toggler me-3"
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
                  <span data-bs-target="#navbarNav" data-bs-toggle="collapse">
                    Home
                  </span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/buy" className="nav-link">
                  <span data-bs-target="#navbarNav" data-bs-toggle="collapse">
                    Coins Packages
                  </span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/sell">
                  <span data-bs-target="#navbarNav" data-bs-toggle="collapse">
                    Sell
                  </span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/buy-players">
                  <span data-bs-target="#navbarNav" data-bs-toggle="collapse">
                    Players Prices
                  </span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/help">
                  <span data-bs-target="#navbarNav" data-bs-toggle="collapse">
                    Help Center
                  </span>
                </Link>
              </li>
              <Link className="nav-link" to="/cart">
                <span data-bs-target="#navbarNav" data-bs-toggle="collapse">
                  <button type="button" className="btn btn-primary">
                    <FaShoppingCart />{" "}
                    <span className="badge text-bg-danger ms-1">
                      {orderAllData.length}
                    </span>
                  </button>
                </span>
              </Link>
            </ul>
          </div>
        </div>
      </nav>
    </NavbarStyled>
  );
};

export default Navbar;

const NavbarStyled = styled.div`
  .active {
    font-weight: 500;
  }
`;