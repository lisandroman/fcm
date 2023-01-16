import React from "react";
import styled from "styled-components";

import psLogo from "../../../assets/images/ps.png";
import xboxLogo from "../../../assets/images/xbox.png";
import pcLogo from "../../../assets/images/pc.png";

const MainContent = () => {
  return (
    <MainContentStyled>
      <div className="container mt-5">
        <h2>Available in all Platforms!</h2>
        <div className="row row-cols-1 row-cols-sm-3 g-4">
          <div className="col">
            <div className="card">
              <img src={psLogo} className="card-img-top" alt="PS Logo" />
              <h6>PS4/5</h6>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <img src={xboxLogo} className="card-img-top" alt="XBOX Logo" />
              <h6>XBOX</h6>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <img src={pcLogo} className="card-img-top" alt="PC Logo" />
              <h6>PC</h6>
            </div>
          </div>
        </div>
      </div>
    </MainContentStyled>
  );
};

export default MainContent;

const MainContentStyled = styled.div`
  width: 50%;
  margin: 0 auto;
  .card {
    border: none;
  }
  h6 {
    margin-top: -1rem;
  }
`;
