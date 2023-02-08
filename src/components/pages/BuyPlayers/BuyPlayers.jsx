import React from "react";
import styled from "styled-components";
import { PlayerPrices } from "../../data/playerPrices.data";
import Swal from "sweetalert2";
import { titles } from "../../../commonStyled";

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
      <h2 className="bg bg-warning title mt-4">Player Prices</h2>
      <h5 className="text-primary mt-3 text-white">
        We teach you how to invest
      </h5>
      <h6 className="text-primary text-white">
        to reach your favorite FUT players
      </h6>
      <div className="container">
        <div className="row">
          <div className="col-sm col-md">
            <div className="mt-3 pb-4">
              <table className="table table-dark table-sm table-striped tableSize align-middle">
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
                          width="40px"
                          height="40px"
                        />
                      </th>
                      <td className="text-white">{item.playerName}</td>
                      <td className="text-white">{item.rating}</td>
                      <td className="text-white">{item.position}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-warning"
                          onClick={() =>
                            handleButtonAskPlayer(item.playerName, item.rating)
                          }
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
  .title {
    ${titles}
  }
  h2 {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  th {
    color: #adb5bd;
    font-weight: 300;
  }
  td {
    font-size: 0.75rem;
  }

  @media (min-width: 992px) {
    width: 60%;
    td {
      font-size: 1.2rem;
    }
  }
`;
