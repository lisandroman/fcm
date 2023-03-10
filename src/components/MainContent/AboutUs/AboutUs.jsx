import React from "react";
import styled from "styled-components";

const AboutUs = () => {
  return (
    <AboutUsStyled className="container mt-4">
      {/* <h2 className="text-bg-primary p-3 d-flex justify-content-start"> */}
      <h2 className="text-bg-primary p-2">About Us</h2>
      <h3 className="container text-white">What is FUT Coins Market?</h3>
      <p className="container">
        We're a team of professional traders that want to help you make profit
        on FUT. Through our safe trading service our professional team will help
        you find deals on the market to flip for a profit. It's very different
        and much better than simply buying coins. Imagine having a top 100
        trader help you trade to your ultimate team. This is FUT Coins Market!
      </p>
    </AboutUsStyled>
  );
};

export default AboutUs;

const AboutUsStyled = styled.div`
  p {
    color: #adb5bd;
  }
  @media (max-width: 575.98px) {
    h3 {
      margin-top: 1rem;
      font-size: 1.2rem;
    }
    p {
      font-size: 0.75rem;
    }
  }
  @media (min-width: 944px) {
    h3 {
      margin-top: 2rem;
    }
    p {
      margin-top: 1rem;
      margin-bottom: 2rem;
      width: 80%;
      font-size: 1.4rem;
    }
  }
`;
