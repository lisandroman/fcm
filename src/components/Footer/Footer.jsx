import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <FooterStyled>
      <div className="container text-center">
        <div className="row">
          <div className="col">FUT Coins Market</div>
          <div className="col">
            <h5>Main Info</h5>
            <h6>Home</h6>
            <h6>Loyalty Program</h6>
            <h6>Partner Program</h6>
            <h6>Terms and Conditions</h6>
          </div>
          <div className="col">
            <h5>Account</h5>
            <h6>Login</h6>
            <h6>Register</h6>
            <h6>Forgot my password</h6>
            <h6>Help Center</h6>
          </div>
          <div className="col">
            <h5>Products</h5>
            <h6>Playstation</h6>
            <h6>XBOX</h6>
            <h6>PC</h6>
          </div>
        </div>
      </div>
    </FooterStyled>
  );
};

export default Footer;

const FooterStyled = styled.div`
  margin-top: 2rem;
  background-color: #212529;
  height: 16rem;
  color: #adb5bd;
  .row {
    padding-top: 2rem;
    h5 {
      margin-bottom: 1.5rem;
      color: white;
    }
  }
`;
