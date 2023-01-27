import React from "react";
import styled from "styled-components";

const BuyPlayers = () => {
  return (
    <BuyPlayersPageStyled>
      <h2>Buy your favorite FUT Player</h2>
      <table className="table table-secondary table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Player Name</th>
            <th scope="col">Rating</th>
            <th scope="col">Position</th>
            <th scope="col">Price</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Pelé</td>
            <td>98</td>
            <td>CAM</td>
            <td>ASK</td>
            <td>
              <button className="btn btn-primary">ask@payment.com</button>
            </td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Ronaldo</td>
            <td>96</td>
            <td>ST</td>
            <td>ASK</td>
            <td>
              <button className="btn btn-primary">ask@payment.com</button>
            </td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Zinedine Zidane</td>
            <td>96</td>
            <td>CAM</td>
            <td>ASK</td>
            <td>
              <button className="btn btn-primary">ask@payment.com</button>
            </td>
          </tr>
        </tbody>
      </table>
    </BuyPlayersPageStyled>
  );
};

export default BuyPlayers;

const BuyPlayersPageStyled = styled.div`
  width: 70%;
  margin: 0 auto;

  h2 {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
`;
