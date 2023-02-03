import React from "react";
import styled from "styled-components";

const Help = () => {

  //TODO  needs to be refactored. Create a json with the info to render

  return (
    <HelpPageStyled>
      <h2 className="container mt-4 mb-4 text-white bg bg-primary">Help Center</h2>
      <div className="accordion" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              How work Fut Coins Market
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <strong>We're a team of professional traders</strong> that want to
              help you make profit on FUT. Through our{" "}
              <strong>safe trading service</strong> our professional team will
              help you find deals on the market to flip for a profit. It's very
              different and much better than simply buying coins. Imagine having
              a top 100 trader help you trade to your ultimate team. This is FUT
              Coins Market!
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              How does it work?
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              Through our Snipe Method, our professional traders browse the
              market for you looking for cards that've been listed far under
              their actual value. Once our trader finds a deal they'll help you
              snipe it and flip it for a profit.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingThree">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              Order done, when could it be completed?
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            aria-labelledby="headingThree"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <strong>Delivering are quickly </strong>just we need to be
              professional and respect the income orders. In 1hour we can
              process orders by 500k, It might takes longer than the normal
              speed when stock is short or when we receive too many orders in
              short time, please wait patiently.{" "}
              <strong>
                You will also receive email notifications when the order is
                done.
              </strong>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingFour">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFour"
              aria-expanded="false"
              aria-controls="collapseFour"
            >
              How long does it take for the order to be delivered?
            </button>
          </h2>
          <div
            id="collapseFour"
            className="accordion-collapse collapse"
            aria-labelledby="headingFour"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              Usually on the same day. Depending on the stock, it may be
              available in <strong>just 1 hour</strong>, we will inform you of
              the time so that you always know the status of your order
            </div>
          </div>
        </div>
      </div>
    </HelpPageStyled>
  );
};

export default Help;


const HelpPageStyled = styled.div`
  width: 85%;
  margin: 0 auto;

  .helpTitle {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
`;