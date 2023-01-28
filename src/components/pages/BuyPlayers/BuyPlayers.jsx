import React from "react";
import styled from "styled-components";
import { PlayerPrices } from "../../data/playerPrices.data";
import Swal from "sweetalert2";

const BuyPlayers = () => {

  const handleButtonAskPlayer = (playerName, rating) => {
     Swal.fire({
      icon: "success",
      title: `To get your ${rating} ${playerName}` ,
      text: `Send an email to: ask@payment.com`,
      footer: '<a href="/">Home</a>',
    });
  }
  return (
    <BuyPlayersPageStyled>
      <h2 className="text-primary mb-0">We teach you</h2>
      <h3 className="text-primary mb-4">How to reach your favorite FUT players</h3>
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
                <img src={item.image} alt="player" style={{ width: "4rem" }} />
              </th>
              <td>{item.playerName}</td>
              <td>{item.rating}</td>
              <td>{item.position}</td>
              <td>{item.price}</td>
              <td>
                <button className="btn btn-primary"
                onClick={()=>handleButtonAskPlayer(item.playerName,item.rating)}
                >ask@payment.com</button>
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
