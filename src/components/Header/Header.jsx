import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <HeaderStyled>
      <div className="headerText">
        <h3 className="">
          The safest, cheapest and most reliable place to upgrade your FUT Club
        </h3>
        <h4 className="fw-light">
          Our team helps you trade using our Snipe Method
        </h4>
      </div>
      <button type="button" className="btn btn-warning">
        BUY !
      </button>
    </HeaderStyled>
  );
};

export default Header;

const HeaderStyled = styled.div`
  margin-top: 1rem;
  background-color: #f8f9fa;
  height: 10rem;

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
  button{
    margin-top: 1rem;
  }
`;
