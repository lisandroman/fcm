import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <FooterStyled>
      <div className="container text-center">
        <div className="row justify-content-center">
          <div className="col footerTitle">FUT Coins Market</div>
          <div className="col-sm footerMainInfo">
            <h5 className="footerMainInfoTitle">Main Info</h5>
            <div className="footerMainContent">
              <h6>Home</h6>
              <h6>Loyalty Program</h6>
              <h6>Partner Program</h6>
              <h6>Terms and Conditions</h6>
            </div>
          </div>
          <div className="col-sm footerAccount">
            <h5 className="footerAccountTitle">Account</h5>
            <div className="footerAccountContent">
              <h6>Login</h6>
              <h6>Register</h6>
              <h6>Forgot my password</h6>
              <h6>Help Center</h6>
            </div>
          </div>
          <div className="col-sm footerProducts">
            <h5 className="footerProductsTitle">Products</h5>
            <div className="footerProductsContent">
              <h6>Playstation</h6>
              <h6>XBOX</h6>
              <h6>PC</h6>
            </div>
          </div>
        </div>
      </div>
    </FooterStyled>
  );
};

export default Footer;

const FooterStyled = styled.div`
  margin-top: 2rem;
  background-color: #252b2d;
  color: #adb5bd;
  padding-bottom: 2rem;
  .row {
    padding-top: 2rem;
    h5 {
      margin-bottom: 1.5rem;
      color: white;
    }
  }

  @media (max-width: 575.98px) {
    .footerTitle {
      font-size: 1.5rem;
    }
    h5 {
      font-size: 1rem;
    }
    h6 {
      font-size: 0.85rem;
    }
    .footerMainInfo,
    .footerAccount,
    .footerProducts {
      h5 {
        margin-top: 2rem;
      }
    }
    .footerProductsTitle,
    .footerAccountTitle,
    .footerMainInfoTitle {
      margin-bottom: -30px;
    }
    .footerMainContent,
    .footerAccountContent,
    .footerProductsContent {
      margin-top: -1rem;
    }
  }
`;
