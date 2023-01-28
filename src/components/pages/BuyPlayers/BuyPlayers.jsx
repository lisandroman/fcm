import React from "react";
import styled from "styled-components";
import { PlayerPrices } from "../../data/playerPrices.data";
import Swal from "sweetalert2";

const BuyPlayers = () => {
  const handleButtonAskPlayer = (playerName, rating) => {
    Swal.fire({
      icon: "success",
      title: `To get your ${rating} ${playerName}`,
      text: `Send an email to: ask@payment.com`,
      footer: '<a href="/">Home</a>',
    });
  };
  return (
    <BuyPlayersPageStyled>
      <h5 className="text-primary mt-3">We teach you</h5>
      <h6 className="text-primary">How to reach your favorite FUT players</h6>
      <div className="container">
      <div className="row">
        <div className="col-sm col-md">
          <div className="mt-3 pb-4">
            <table className="table table-sm table-striped tableSize align-middle">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Player Name</th>
                  <th scope="col">Rating</th>
                  <th scope="col">Position</th>
                  <th scope="col">Price</th>
                </tr>
              </thead>
              <tbody>
                {PlayerPrices.map((item) => (
                  <tr key={item.id} className="align-middle">
                    <th scope="row">
                      <img
                        src={item.image}
                        alt="player"
                        style={{ width: "4rem" }}
                      />
                    </th>
                    <td>{item.playerName}</td>
                    <td>{item.rating}</td>
                    <td>{item.position}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={()=>handleButtonAskPlayer(item.playerName, item.rating)}
                      >
                        Ask
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </div>
        </div>
      </div>
    </BuyPlayersPageStyled>
  );
};

export default BuyPlayers;

const BuyPlayersPageStyled = styled.div`
margin: 0 auto;
  h2 {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
`;
