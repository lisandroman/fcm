import React from "react";
import styled from "styled-components";
import { PlayerPrices } from "../../data/playerPrices.data";

const BuyPlayers = () => {
  return (
    <BuyPlayersPageStyled>
      <h2>Buy your favorite FUT Player</h2>
      <table className="table table-secondary table-striped">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Player Name</th>
            <th scope="col">Rating</th>
            <th scope="col">Position</th>
            <th scope="col">Price</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {PlayerPrices.map((item) => (
            <tr key={item.id} className="align-middle">
              <th scope="row">
                <img src={item.image} alt="player" style={{width:"4rem"}} />
              </th>
              <td>{item.playerName}</td>
              <td>{item.rating}</td>
              <td>{item.position}</td>
              <td>{item.price}</td>
              <td>
                <button className="btn btn-primary">ask@payment.com</button>
              </td>
            </tr>
          ))}
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
