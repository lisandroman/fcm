import React, { useState } from "react";
import { RiComputerLine } from "react-icons/ri";
import { SiPlaystation, SiXbox } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Swal from "sweetalert2";
import { titles } from "../../../commonStyled";
import { addToCart, getCurrency } from "../../../redux/state/orders";
import { PriceListPC } from "../../data/priceListPC.data";
import { PriceListPS } from "../../data/priceListPS.data";
import { PriceListXBOX } from "../../data/priceListXBOX.data";
import { v4 as uuidv4 } from "uuid";

const Buy = () => {
  const dispatch = useDispatch();
  const getCurrencyData = useSelector(getCurrency);
   const [total, setTotal] = useState(0);
   const [content, setContent] = useState(PriceListPS);
   const [sellAmount, setSellAmount] = useState(0);

 const [customCoins, setCustomCoins] = useState(0);
 const [customPrice, setCustomPrice] = useState(0);
 const [customPlatform, setCustomPlatform] = useState("PS4/PS5");

  const handleInputAmount = (e) => {
    let preValue = 0;
    setSellAmount(e.target.value);
    if (e.target.value < 1000000) {
      preValue = e.target.value * 0.000128;
    } else if (e.target.value >= 1000000 || e.target.value <= 3000000) {
      preValue = e.target.value * 0.00011;
    } else {
      preValue = e.target.value * 0.0001;
    }

    let roundValue = Math.round(preValue * 100) / 100;
   setCustomPrice(roundValue);
    return e.target.value < 100000 ? setTotal(0) : setTotal(roundValue);
  };
console.log(sellAmount)
  const handleBuy = (id, coins, price, platform) => {
    Swal.fire({
      icon: "success",
      title: "Added to Cart",
      text: `Added ${coins}K per ${(
        Math.round(parseInt(price) * parseFloat(actualCurrency()) * 100) / 100
      ).toFixed(2)} ${getCurrencyData} in ${platform}`,
      footer: '<a href="/cart">Go to your Cart</a>',
      // footer: '<a href="https://futcoinsmarket.net/cart">Go to your Cart</a>',
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

  const handlePlatformListPS = () => {
    setContent(PriceListPS);
  };
  const handlePlatformListXBOX = () => {
    setContent(PriceListXBOX);
  };
  const handlePlatformListPC = () => {
    setContent(PriceListPC);
  };

  let amountFormated;

  const makeAmountFormat = () => {
    let tempSellAmount = sellAmount;
    return tempSellAmount < 999
      ? (amountFormated = tempSellAmount.toLocaleString())
      : tempSellAmount >= 1000 && tempSellAmount < 1000000
      ? (amountFormated = tempSellAmount.toLocaleString().concat(" K"))
      : tempSellAmount >= 1000000
      ? (amountFormated = tempSellAmount.toLocaleString().concat(" M"))
      : null;
  };
  makeAmountFormat();

  return (
    <BuyPageStyled>
      <h2 className="bg bg-warning title mt-4">Packages</h2>

      <div className="header pe-3 ps-3">
        <p className="text-warning">
          Contract our services to improve your FUT Squad
        </p>
        <p className="text-white">
          Upgrade your FUT club through out trading service. Simple choose a
          package and let our team help you safely trade up to the amount you
          order
        </p>
      </div>

      <div className="text-bg-light p-3">
        <h4>Enter your custom amount:</h4>

        <div className="buyFormRadios">
          <div className="form-check">
            <input
              className="me-2"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              value="PS4/5"
              defaultChecked
              onChange={(e) => setCustomPlatform(e.target.value)}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              PS4/5
            </label>
          </div>

          <div className="form-check">
            <input
              className="me-2"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
              value="XBOX"
              onChange={(e) => setCustomPlatform(e.target.value)}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault2">
              XBOX
            </label>
          </div>

          <div className="form-check">
            <input
              className="me-2"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault3"
              value="PC"
              onChange={(e) => setCustomPlatform(e.target.value)}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault3">
              PC
            </label>
          </div>
        </div>
        <form>
          <div className="buyForm row g-3 border form-control">
            <div className="col-sm-6">
              <label htmlFor="Amount2">
                Coins:
                <span className="badge text-bg-danger text-white ms-2 mb-2">
                  5% OFF buying 1 Million+
                </span>
              </label>
              <input
                type="number"
                id="Amount2"
                className="form-control"
                step="100000"
                placeholder="Enter your custom coins"
                onChange={handleInputAmount}
                // onChange={(e) => setCustomCoins(e.target.value)}
              />
              <span className="badge text-bg-primary text-white mb-2">
                Your amount: {amountFormated}
              </span>
            </div>
            <div className="buyForm_rate_price col-sm">
              <label htmlFor="Price">Rate Price:</label>
              <input
                type="number"
                className="form-control"
                placeholder={
                  total < 100
                    ? "12.8USD per 100.000k"
                    : total >= 100 && total < 300
                    ? "11USD per 100.000k"
                    : total >= 30
                    ? "10usd per 100.000k"
                    : null
                }
                aria-label="Price"
                disabled
              />
            </div>
            <div className="col-sm buyFormAmount">
              <label htmlFor="FinalPrice">Final Price</label>
              <p className="form-control">{customPrice} USD</p>
            </div>
          </div>
        </form>
        <div>
          {total < 200 || customPlatform === ""
            ? [
                <button
                  className="btn btn-primary mt-3 me-3"
                  onClick={handleBuy}
                  key={3001}
                >
                  Add to Cart
                </button>,
              ]
            : [
                <p className="amountConditional" key={3002}>
                  If you want to buy that amount, contact us:
                </p>,
                <button
                  className="btn btn-outline-primary disabled mb-3"
                  key={3003}
                >
                  deliveries@futcoinsmarket.net
                </button>,
              ]}
        </div>
      </div>

      {/* ---------------------       TABLE       ----------------------------*/}

      <h2 className="services text-bg-primary mb-3">All our Services</h2>
      <div className="mb-3">
        <h4 className="pb-2 text-warning">Choose your platform</h4>
        <button className="btn btn-primary m-1" onClick={handlePlatformListPS}>
          PS4/5
        </button>
        <button
          className="btn btn-success m-1"
          onClick={handlePlatformListXBOX}
        >
          XBOX
        </button>
        <button className="btn btn-warning m-1" onClick={handlePlatformListPC}>
          PC
        </button>
        <h5 className=" text-white mt-4">
          Use <strong>'bestprice'</strong> code to get 10% off
        </h5>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-sm col-md">
            <div className="mt-3 pb-4">
              <table className="table table-dark table-sm table-striped tableSize align-middle">
                <thead>
                  <tr>
                    <th scope="col">Platform</th>
                    <th scope="col">Coins</th>
                    <th scope="col">Price</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {content?.map((item) => (
                    <tr key={item.id} className="align-middle">
                      {item.platform === "PS4/5" ? (
                        <th scope="row" className="text-primary">
                          <SiPlaystation />
                        </th>
                      ) : item.platform === "XBOX" ? (
                        <th scope="row" className="text-success">
                          <SiXbox />
                        </th>
                      ) : (
                        <th scope="row" className="text-warning">
                          <RiComputerLine />
                        </th>
                      )}

                      {item.coins >= 1000000 ? (
                        <td>
                          {item.coins.toLocaleString().concat(" M")}
                          {"  "}
                        </td>
                      ) : (
                        <td>{item.coins.toLocaleString()}</td>
                      )}

                      <td>
                        {getCurrencyData}{" "}
                        {(
                          Math.round(
                            parseInt(item.price) *
                              parseFloat(actualCurrency()) *
                              100
                          ) / 100
                        ).toFixed(2)}
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-warning me-1"
                          onClick={() =>
                            handleBuy(
                              item.id,
                              item.coins,
                              item.price,
                              item.platform
                            )
                          }
                        >
                          Buy
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="container mt-4">
                <h4 className="text-white">
                  if you want to buy another amount, contact us:
                </h4>
                <button className="btn btn-outline-warning mt-2">
                  deliveries@futcoinsmarket.net
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BuyPageStyled>
  );
};

export default Buy;

const BuyPageStyled = styled.div`
  margin: 0 auto;
  margin-top: 1rem;
  .title {
    ${titles}
  }

  .buyForm,
  .buyFormRadios {
    width: 90%;
    margin: 0 auto;
    .buyFormAmount input::placeholder {
      text-align: center;
    }
  }
  .amountConditional {
    margin-top: 0.75rem;
    color: red;
    font-size: 1rem;
  }

  .tableSize {
    margin: 0 auto;
  }

  th {
    color: #adb5bd;
    font-weight: 300;
  }
  td {
    font-size: 0.75rem;
  }
  .ss01 {
    font-feature-settings: "ss01" 1;
  }
  .services {
    margin-top: 1rem;
  }

  @media (min-width: 992px) {
    width: 60%;
    font-size: 1.4rem;
    .header {
      margin-top: 1.5rem;
      margin-bottom: 2rem;
      p {
        padding-left: 6rem;
        padding-right: 6rem;
      }
    }

    form .buyForm {
      margin-top: 1.5rem;
    }
    form .buyForm .col-sm-6 {
      margin: 0 auto;
      margin-top: 1rem;
      label,
      span,
      input::placeholder {
        font-size: 1.2rem;
      }
      input {
        margin-bottom: 1rem;
      }
    }
    .buyForm_rate_price label,
    .buyFormAmount label,
    .buyFormAmount label p {
      font-size: 1.2rem;
    }
    .buyForm_rate_price input {
      width: 50%;

      margin: 0 auto;
    }
    .buyFormAmount p {
      font-size: 1.5rem;
      width: 50%;
      margin: 0 auto;
    }

    .buyFormAmount {
      margin-top: 2rem;
      margin-bottom: 2rem;
    }

    table td {
      font-size: 2rem;
    }
  }

  .paypalButtonsContainer {
    width: 50%;
    margin: 0 auto;
  }
`;
