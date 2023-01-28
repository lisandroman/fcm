import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  allData,
  clearCart,
  fetchData,
  getCurrency,
  getDataErrors,
  getDataStatus,
  removeFromCart,
} from "../../../redux/state/orders";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Swal from "sweetalert2";
import { FaCoins } from "react-icons/fa";
import { FaGamepad } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import CoverTax from "./Cart.Utilities/Cart.Utilities.CoverTax";

const Cart = () => {
  const dispatch = useDispatch();
  const orderAllData = useSelector(allData);
  const orderStatus = useSelector(getDataStatus);
  const orderErrors = useSelector(getDataErrors);
  const getCurrencyData = useSelector(getCurrency);

  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const [coupon, setCoupon] = useState("");
  const [isValidCoupon, setIsValidCoupon] = useState(false);
  const [isMoreThanOnePlatform, setIsMoreThanOnePlatform] = useState(false);

  let content;

  const handleRemoveItemFromCart = (id) => {
    dispatch(removeFromCart(id));
  };
  const handleClearCart = () => {
    dispatch(clearCart());
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

  if (orderStatus === "loading") {
    content = (
      <tr>
        <td>Loading cart...</td>
      </tr>
    );
  } else if (orderStatus === "succeeded") {
    content = orderAllData?.map((item) => (
      <tr className="tableRowStyled" key={item.id}>
        {item.id === 74 ? (
          <td className="text-start ps-4">
            <FaCoins /> {item.coins} K{" "}
            <span className="badge text-bg-danger ms-2">Tax</span>
          </td>
        ) : (
          <td className="text-start ps-4">
            <FaCoins /> {item.coins} K
          </td>
        )}
        <td>
          {item.platform} <FaGamepad />
        </td>
        <td className="text-end pe-4">
          {getCurrencyData}{" "}
          <strong>
            {(
              Math.round(
                parseInt(item.price) * parseFloat(actualCurrency()) * 100
              ) / 100
            ).toFixed(2)}
          </strong>
        </td>
        <td>
          <button
            className="btn btn-sm btn-dark"
            onClick={() => handleRemoveItemFromCart(item.id)}
          >
            <FaTrashAlt className="text-light" />
          </button>
        </td>
      </tr>
    ));
  } else if (orderStatus === "failed") {
    content = <p>{orderErrors}</p>;
  }

  const checkPlatforms = () => {
    const checkPlat = orderAllData.map((item) => item.platform);
    const firstPlatform = checkPlat[0];
    for (let i = 0; i < checkPlat.length; i++) {
      if (firstPlatform !== checkPlat[i]) {
        setIsMoreThanOnePlatform(true);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          html:
            "<p>We just accept 1 platform per order</p>" +
            "<p>To continue please remove the different platform</p>" +
            "<h4>Finally click the button -Reload Screen-</h4>",
        });
      }
    }
  };

  useEffect(() => {
    if (orderStatus === "idle") {
      dispatch(fetchData());
    }
    checkPlatforms();
  }, [orderStatus, dispatch]);

  // ----------- Variables PRICES -----------

  const takeOrderPrices = orderAllData.map(
    (item) => item.price * actualCurrency()
  );
  const getTotal = takeOrderPrices.reduce((a, b) => {
    return a + b;
  }, 0);

  let paymentFee = parseInt(getTotal) - parseInt(getTotal) * parseFloat(0.97);
  let paymentFeeRoundValue = (Math.round(paymentFee * 100) / 100).toFixed(
    parseInt(2)
  );

  let totalPrice = parseInt(getTotal) + parseFloat(paymentFeeRoundValue);

  const subTotal = getTotal;
  const discountCoupon = ((totalPrice * 10) / 100).toFixed(2);

  const discount1M = Math.round(totalPrice * 5) / 100;

  // paymentFeeRoundValue is already done. Line 112
  const totalAfterCoupon = totalPrice - (totalPrice * 10) / 100;
  const subTotalWithFee = parseInt(subTotal) + parseFloat(paymentFeeRoundValue);

  // Subtotal Coins
  const takeOrderCoins = orderAllData.map((item) => item.coins);
  const getTotalCoins = takeOrderCoins.reduce((a, b) => {
    return a + b;
  }, 0);

  // ---------------- Paypal Checkout ---------------

  const allCartContent = orderAllData.map((item) => item.price);
  const getTotalOriginal = allCartContent.reduce((a, b) => {
    return a + b;
  }, 0);
  let paymentFeeOriginal = getTotalOriginal - getTotalOriginal * 0.97;
  let paymentFeeRoundValueOriginal = (
    Math.round(paymentFeeOriginal * 100) / 100
  ).toFixed(parseInt(2));

  let totalPriceOriginal =
    parseFloat(getTotalOriginal) + parseFloat(paymentFeeRoundValueOriginal);

  // Paypal Buttons

  const handleApprove = (orderID) => {
    setPaidFor(true);
  };

  if (paidFor) {
    Swal.fire({
      icon: "success",
      title: "Thanks for buy in Fut Coins Market",
      text: `Please complete the next form with your info`,
      footer: '<a href="/form-game-data">Go to Form</a>',
    });
  }
  if (error) {
    alert(error);
  }

  const handleDiscountCoupon = (e) => {
    setCoupon(e.target.value);
  };

  const discountCupon = () => {
    console.log("Discount Code Added!");
    return coupon === "testing" ? setIsValidCoupon(true) : null;
  };

  return (
    <CartStyled>
      <h2>Cart</h2>
      <h3>Your Order:</h3>
      <div className="container cartGrid pb-5">
        <div className="row border-bottom">
          <div className="col-sm-8">
            <div className="bg bg-white">
              <div className="ps-4 border-bottom">
                <h5 className="text-start text-danger">Items in cart</h5>
              </div>

              <div className="ps-4 pe-4 mt-4 pb-4">
                <table className="table table-sm table-striped tableSize">
                  <tbody>{content}</tbody>
                </table>
                <CoverTax />
                <button
                  className="btn btn-sm btn-dark mt-5"
                  onClick={handleClearCart}
                >
                  Clear Cart
                </button>
                {isMoreThanOnePlatform === true ? (
                  <button
                    className="btn btn-sm btn-success mt-5 ms-2"
                    onClick={() => window.location.reload(false)}
                  >
                    Reload Screen
                  </button>
                ) : null}
              </div>
            </div>
          </div>

          {/* --------------------------------------------- Right side - Cart Total -------------------------------------  */}
          {isMoreThanOnePlatform === true ? null : (
            <div className="col-sm-4 mb-5">
              <div className="bg bg-white">
                <div className="ps-4 border-bottom">
                  <h5 className="text-start text-danger">Cart Total:</h5>
                </div>

                <div className="row mt-4">
                  <div className="col-9">
                    <div className="form-outline mb-1 ps-4">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        placeholder="Discount Code"
                        onChange={handleDiscountCoupon}
                      />
                    </div>
                  </div>

                  <div className="col">
                    <button className="btn btn-danger" onClick={discountCupon}>
                      Apply
                    </button>
                  </div>
                </div>

                <div className="mt-4 pb-2">
                  <p className="text-start ps-4">
                    Subtotal:{" "}
                    <strong>
                      {getCurrencyData} {subTotal}
                    </strong>
                  </p>
                  <p className="text-start ps-4 border-bottom pb-4">
                    Payment Fee:{" "}
                    <strong>
                      {getCurrencyData} {paymentFeeRoundValue}{" "}
                    </strong>
                    (3%)
                  </p>
                  {/* <p className="text-start ps-4">Discounts:</p> */}
                  {isValidCoupon === true ? (
                    <p className="text-start text-danger ps-4">
                      Discount Code - 10%:{" "}
                      <strong>
                        {getCurrencyData} {discountCoupon}{" "}
                      </strong>
                    </p>
                  ) : null}
                  {getTotalCoins >= 1000 ? (
                    <p className="text-start text-danger ps-4">
                      1 Million+ Discount:{" "}
                      <strong>
                        {getCurrencyData} {discount1M}
                      </strong>{" "}
                      (5%)
                    </p>
                  ) : null}
                </div>

                <div className=" mt-4 pb-2">
                  {isValidCoupon === true && getTotalCoins > 1000
                    ? [
                        <h3 className="text-center text-danger">
                          {" "}
                          Total:{" "}
                          <span>
                            {" "}
                            <strong>
                              {" "}
                              {parseFloat(
                                subTotalWithFee -
                                  (subTotalWithFee * 10) / 100 -
                                  (subTotalWithFee * 5) / 100
                              ).toFixed(2)}{" "}
                            </strong>{" "}
                            {getCurrencyData}{" "}
                          </span>{" "}
                        </h3>,
                        <h5>
                          {" "}
                          USD{" "}
                          {(
                            Math.round(
                              (parseFloat(
                                subTotalWithFee -
                                  (subTotalWithFee * 10) / 100 -
                                  (subTotalWithFee * 5) / 100
                              ) /
                                parseFloat(actualCurrency())) *
                                100
                            ) / 100
                          ).toFixed(2)}{" "}
                        </h5>,
                      ]
                    : isValidCoupon === true && getTotalCoins < 1000
                    ? [
                        <h3 className="text-center text-danger">
                          Total:
                          <span>
                            <strong>
                              {parseFloat(
                                subTotalWithFee - (subTotalWithFee % 10)
                              ).toFixed(2)}
                            </strong>
                            {getCurrencyData}
                          </span>
                        </h3>,
                        <h5>
                          {" "}
                          USD{" "}
                          {(
                            Math.round(
                              (parseFloat(
                                subTotalWithFee - (subTotalWithFee % 10)
                              ) /
                                parseFloat(actualCurrency())) *
                                100
                            ) / 100
                          ).toFixed(2)}{" "}
                        </h5>,
                      ]
                    : isValidCoupon !== true && getTotalCoins < 1000
                    ? [
                        <h3 className="text-center text-danger">
                          Total:{" "}
                          <span>
                            <strong>
                              {parseFloat(subTotalWithFee).toFixed(2)}
                            </strong>
                            {getCurrencyData}
                          </span>
                        </h3>,
                        <h5>
                          {" "}
                          USD{" "}
                          {(
                            Math.round(
                              (parseFloat(subTotalWithFee) /
                                parseFloat(actualCurrency())) *
                                100
                            ) / 100
                          ).toFixed(2)}{" "}
                        </h5>,
                      ]
                    : isValidCoupon !== true && getTotalCoins >= 1000
                    ? [
                        <h3 className="text-center text-danger">
                          Total:{" "}
                          <span>
                            <strong>
                              {parseFloat(
                                subTotalWithFee - (subTotalWithFee * 5) / 100
                              ).toFixed(2)}
                            </strong>
                            {getCurrencyData}
                          </span>
                        </h3>,
                        <h5>
                          {" "}
                          USD{" "}
                          {(
                            Math.round(
                              (parseFloat(
                                subTotalWithFee - (subTotalWithFee * 5) / 100
                              ) /
                                parseFloat(actualCurrency())) *
                                100
                            ) / 100
                          ).toFixed(2)}{" "}
                        </h5>,
                      ]
                    : null}
                </div>

                <div className="paypalButtonsContainer">
                  <PayPalScriptProvider
                    options={{
                      "client-id":
                        "AYSCSFR3MypXty2_BjrXfTvx0u_n-hozFbeVUzbfSam6lo5-g6scL0-zoOfreObJK1svNZucC8LnH5fw",
                    }}
                  >
                    <PayPalButtons
                      onClick={(data, actions) => {
                        const hasAlreadyBought = false;
                        if (hasAlreadyBought) {
                          setError("You already bought this item!");
                          return actions.reject();
                        } else {
                          return actions.resolve();
                        }
                      }}
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                value: totalPriceOriginal,
                              },
                            },
                          ],
                        });
                      }}
                      onApprove={async (data, actions) => {
                        const order = await actions.order.capture();
                        console.log("order:", order);
                        console.log("order ID:", order.id);
                        handleApprove(data.orderID);
                        handleClearCart();
                        // return actions.order.capture().then((details) => {
                        //   const name = details.payer.name.given_name;
                        //   alert(`Transaction completed by ${name}`);
                        // });
                      }}
                      onCancel={() => {}}
                      onError={(err) => {
                        setError(err);
                        console.log("Paypal Checkout Error:", err);
                      }}
                    />
                  </PayPalScriptProvider>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="col text-start p-4 mt-3 bg bg-white ">
          <h2>
            <span className="badge text-bg-danger text-white mb-2">
              Get 5% OFF
            </span>
          </h2>
          <h3 className="text-danger">Crypto Payment:</h3>
          <h5>
            If you want to pay with Crypto contact us by email and get 5% extra
            discount:
          </h5>
          <button className="btn btn-outline-primary mt-3">
            crypto@payment.com
          </button>
        </div>
      </div>
    </CartStyled>
  );
};

export default Cart;

const CartStyled = styled.div`
  margin-top: 1rem;
  background-color: #f8f9fa;

  .cartGrid {
    /* border :1px solid red; */
  }
  .tableRowStyled {
    background-color: #f8f9fa;
  }
  .termsAndConditionsText {
    color: grey;
    font-size: 0.7rem;
  }
  .removeButon {
    cursor: pointer;
  }
  .paypalButtonsContainer {
    width: 70%;
    margin: 0 auto;
  }
`;
