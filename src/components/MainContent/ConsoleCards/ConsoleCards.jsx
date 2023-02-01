import React from "react";
import styled from "styled-components";
import { RiComputerLine } from "react-icons/ri";
import { SiXbox } from "react-icons/si";
import { SiPlaystation } from "react-icons/si";

const MainContent = () => {
  return (
    <MainContentStyled>
      <div className="container mt-4 mb-5">
        <h3 className="mb-4">Available in all Platforms!</h3>

        <div className="row row-cols-3 row-cols-lg-3 row-cols-md-2 g-2 platforms">
          <div className="col">
            <button className="btn btn-primary">
              <h1>
                <SiPlaystation />
              </h1>
            </button>
          </div>
          <div className="col">
            <button className="btn btn-success">
              <h1>
                <SiXbox />
              </h1>
            </button>
          </div>
          <div className="col">
            <button className="btn btn-warning">
              <h1>
                <RiComputerLine />
              </h1>
            </button>
          </div>
        </div>
      </div>
    </MainContentStyled>
  );
};

export default MainContent;

const MainContentStyled = styled.div`
  width: 75%;
  margin: 0 auto;
  h3, h6 {
    color: #adb5bd;
  }
  h6 {
    margin-top: -1rem;
  }
  .platforms {
    @media (min-width: 944px) {
      width: 50%;
      margin: 0 auto;
      button {
        width: 150px;
        height: 70px;
      }
    }
  }
`;
