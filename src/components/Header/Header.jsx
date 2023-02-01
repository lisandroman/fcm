import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
  return (
    <HeaderStyled className="mt-5">
      <div className="headerText">
        <h3 className="text-white">
          The safest, cheapest and most reliable place to upgrade your FUT Club
        </h3>
        {/* <h4 className="fw-light text-white"> */}
        <h4 className="fw-light">
          Our team helps you trade using our Snipe Method
        </h4>
      </div>
      <Link to="/buy">
        <button type="button" className="btn btn-warning">
          BUY !
        </button>
      </Link>
    </HeaderStyled>
  );
};

export default Header;

const HeaderStyled = styled.div`
  /* background-color: #f8f9fa; */
  height: 10rem;
  width: 50%;
  margin: 0 auto;
  h4 {
    color: #adb5bd;
  }
  @media (max-width: 575.98px) {
    width: 100%;
  }

  .headerText {
    @media (max-width: 575.98px) {
      h3 {
        padding-top: 1rem;
        font-size: 1rem;
      }
      h4 {
        font-size: 0.85rem;
      }
    }
  }
  button {
    margin-top: 1rem;
  }
`;
