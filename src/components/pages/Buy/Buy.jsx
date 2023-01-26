import React, { useState } from "react";
import styled from "styled-components";
import { PriceListPS } from "../../data/priceListPS.data";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getCurrency } from "../../../redux/state/orders";

const Buy = () => {
  const dispatch = useDispatch();
  const getCurrencyData = useSelector(getCurrency);
  const [total, setTotal] = useState(0);

  const handleInputAmount = (e) => {
    let preValue = e.target.value * 0.128;
    let roundValue = (Math.round(preValue * 100) / 100).toFixed(2);
    return e.target.value < 12.8 ? setTotal(0) : setTotal(roundValue);
  };

  const handleBuy = (id, coins, price, platform) => {
    // console.log(`Vas a comprar ${coins}K, por un precio de: ${price}USD`);
    Swal.fire({
      icon: "success",
      title: "Added to Cart",
      text: `Added ${coins}K per ${(
        Math.round(parseInt(price) * parseFloat(actualCurrency()) * 100) / 100
      ).toFixed(2)} ${getCurrencyData} in ${platform}`,
      footer: '<a href="/cart">Go to your Cart</a>',
    });
    dispatch(addToCart({ id, coins, price, platform, getCurrencyData }));
  };
    let priceToShow;
    const actualCurrency = () => {
      return getCurrencyData === "USD"
        ? (priceToShow = 1.0)
        : getCurrencyData === "CAD"
        ? (priceToShow = 1.3)
        : getCurrencyData === "AUD"
        ? (priceToShow = 1.5)
        : getCurrencyData === "EUR"
        ? (priceToShow = 0.95)
        : getCurrencyData === "GBP"
        ? (priceToShow = 0.82)
        : (priceToShow = 1.0);
    };


  return (
    <BuyPageStyled>
      <h2>Buy our services to improve your FUT Squad</h2>

      <div className="text-bg-light p-3">
        <h4>Enter your custom amount in K:</h4>

        <div className="buyFormRadios">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
            />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              PS4/5
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
            />
            <label className="form-check-label" htmlFor="flexRadioDefault2">
              XBOX
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault3"
            />
            <label className="form-check-label" htmlFor="flexRadioDefault3">
              PC
            </label>
          </div>
        </div>

        <div className="buyForm row g-3">
          <div className="col-sm-6">
            <label htmlFor="Amount">Minimum 100k: </label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter your custom coins"
              aria-label="Amount"
              onChange={handleInputAmount}
            />
          </div>
          <div className="col-sm">
            <label htmlFor="Price">Price:</label>
            <input
              type="text"
              className="form-control"
              placeholder="12.8USD per 100k"
              aria-label="Price"
              disabled
            />
          </div>
          <div className="col-sm buyFormAmount">
            <label htmlFor="FinalPrice">Final Price</label>
            <p className="form-control">{total} USD</p>
          </div>
        </div>
        <div>
          {total < 12.8 ? (
            [
              <button className="btn btn-secondary mt-3 disabled">
                Pay your order
              </button>,
              <p className="amountConditional">Minimum must be 100k</p>,
            ]
          ) : (
            <button className="btn btn-warning mt-3">Pay your order</button>
          )}
        </div>
      </div>

      {/* ---------------------       TABLE       ----------------------------*/}

      <h2 className="text-bg-primary mb-3">All our Services</h2>
      <div className="mb-3">
        <h4 className="pb-2">Choose your platform</h4>
        <button className="btn btn-primary m-1">PS4/PS5 Coins</button>
        <button className="btn btn-success m-1 ">XBOX Coins</button>
        <button className="btn btn-warning m-1">PC Coins</button>
      </div>
      <table className="table table-sm table-secondary table-striped table-bordered tableSize">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Coins</th>
            <th scope="col">Platform</th>
            <th scope="col">Price</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {PriceListPS.map((item) => {
            return (
              <tr>
                <th scope="row">{item.id}</th>
                <td>{item.coins}K</td>
                <td>{item.platform}</td>
                <td>
                  {getCurrencyData}{" "}
                  {(
                    Math.round(
                      parseInt(item.price) * parseFloat(actualCurrency()) * 100
                    ) / 100
                  ).toFixed(2)}
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() =>
                      handleBuy(item.id, item.coins, item.price, item.platform)
                    }
                  >
                    Buy
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </BuyPageStyled>
  );
};

export default Buy;

const BuyPageStyled = styled.div`
  margin-top: 1rem;

  .buyForm,
  .buyFormRadios {
    width: 50%;
    margin: 0 auto;
    .buyFormAmount input::placeholder {
      text-align: center;
    }
  }
  .amountConditional {
    margin-top: 0.75rem;
    color: red;
    font-size: 0.75rem;
  }

  .tableSize {
    width: 75%;
    margin: 0 auto;
  }
`;
