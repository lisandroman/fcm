import React from "react";
import styled from "styled-components";
import { RiComputerLine } from "react-icons/ri";
import { SiXbox } from "react-icons/si";
import { SiPlaystation } from "react-icons/si";
import { Tooltip } from "react-tooltip";

const MainContent = () => {
  return (
    <MainContentStyled>
      <div className="container mt-4 mb-5">
        <h3 className="mb-4">Available in all Platforms!</h3>

        <div className="row row-cols-3 row-cols-lg-3 row-cols-md-2 g-2 platforms">
          <div className="col">
            <button
              className="btn btn-primary"
              id="attributes-basic"
              data-tooltip-content="Playstation"
              title="Playstation"
            >
              <h1>
                <SiPlaystation />
              </h1>
            </button>
            <Tooltip anchorId="attributes-basic" />
          </div>
          <div className="col">
            <button
              className="btn btn-success"
              id="attributes-basic2"
              data-tooltip-content="XBOX"
              title="XBOX"
            >
              <h1>
                <SiXbox />
              </h1>
            </button>
            <Tooltip anchorId="attributes-basic2" />
          </div>
          <div className="col">
            <button
              className="btn btn-warning"
              id="attributes-basic3"
              data-tooltip-content="PC"
              title="PC"
            >
              <h1>
                <RiComputerLine />
              </h1>
            </button>
            <Tooltip anchorId="attributes-basic3" />
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
  h3,
  h6 {
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
