import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import React, { useEffect, useState } from "react";
import { FaCoins, FaGamepad, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Swal from "sweetalert2";
import { titles } from "../../../commonStyled";
import {
  allData,
  clearCart,
  fetchData,
  getCurrency,
  getDataErrors,
  getDataStatus,
  getLatestPrice,
  priceFinalToForm,
  removeFromCart
} from "../../../redux/state/orders";
import { useRef } from "react";
import CouponAD from "./Cart.Utilities/Cart.Utilities.CouponAD";

const Cart = () => {
  const dispatch = useDispatch();
  const orderAllData = useSelector(allData);
  const orderStatus = useSelector(getDataStatus);
  const orderErrors = useSelector(getDataErrors);
  const getCurrencyData = useSelector(getCurrency);
  const priceInFormToDelivery = useSelector(getLatestPrice);

  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const [coupon, setCoupon] = useState("");
  const [couponPorcent, setCouponPorcent] = useState(0);
  const [isValidCoupon, setIsValidCoupon] = useState(false);
  const [isMoreThanOnePlatform, setIsMoreThanOnePlatform] = useState(false);
  const [priceToPayInPaypal, setPriceToPayInPaypal] = useState(0);

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
      <tr key={item.id} className="tableRowStyled">
        {item.id === 74 &&
        !(
          orderAllData.findIndex((item) => item.id === 74) ===
          orderAllData.length - 1
        ) ? (
          [
            Swal.fire({
              icon: "error",
              title: "Oops...",
              html:
                "<p>We remove the tax fee</p>" +
                "<p>Because your Ordar has changed</p>" +
                "<h4>Please Add again if you want</h4>",
            }),
            dispatch(removeFromCart(item.id)),
          ]
        ) : item.id === 74 ? (
          <td className="text-start ps-4 textOrderItems">
            <span>
              <FaCoins /> {item.coins.toLocaleString()}
            </span>
            <span className="badge text-bg-danger ms-2">Tax</span>
          </td>
        ) : item.coins >= 1000000 ? (
          <td className="text-start ps-4 textOrderItems">
            <span>
              <FaCoins /> {item.coins.toLocaleString().concat(" M")}
            </span>
          </td>
        ) : (
          <td className="text-start ps-4 textOrderItems">
            <span>
              <FaCoins /> {item.coins.toLocaleString()}
            </span>
          </td>
        )}
        <td className="textOrderItems">
          <span>
            {item.platform} <FaGamepad />
          </span>
        </td>
        <td className="text-end pe-4 textOrderItems">
          <span>
            {getCurrencyData}{" "}
            <strong>
              {(
                Math.round(parseFloat(item.price) * actualCurrency() * 100) /
                100
              ).toFixed(2)}
            </strong>
          </span>
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

  const checkPlat = orderAllData.map((item) => item.platform);
  const checkPlatforms = () => {
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

  // ----------- Variables PRICES -----------
  const takeOrderPrices = orderAllData.map( (item) => item.price * actualCurrency() );
  const getTotal = takeOrderPrices.reduce((a, b) => { return a + b }, 0);
  
  const discountCupon = () => {
    setIsValidCoupon(true);
    return coupon === 'bestprice'
    ? setCouponPorcent(10)
    : coupon === 'reveal'
    ? setCouponPorcent(5)
    : alert('Invalid Coupon')
  };
  
  const discountCoupon = ((getTotal * couponPorcent) / 100).toFixed(2) * 1;
  const totalPrice = (getTotal - discountCoupon).toFixed(2) * 1;
  
  const totalPriceRef = useRef(null)
  totalPriceRef.current = totalPrice

  
  
  // Subtotal Coins
  const takeOrderCoins = orderAllData.map((item) => item.coins);
  const getTotalCoins = takeOrderCoins.reduce((a, b) => { return a + b; }, 0);

  // Paypal Buttons
  const handleApprove = (orderID, totalPrice) => {
    setPaidFor(true);
    dispatch(priceFinalToForm(totalPrice));
  };
 
  if (paidFor) {
    // Swal.fire({
    //   icon: "success",
    //   title: "Thanks for buy in Fut Coins Market",
    //   text: `Please complete the next form with your info`,
    //   footer: '<a href="/thanks">Go to Form</a>',
    // });
    
  }
  if (error) {
    alert(error);
  }

  const handleDiscountCoupon = (e) => { setCoupon(e.target.value); };

  useEffect(() => {
    if (orderStatus === "idle") {
      dispatch(fetchData());
    }
    checkPlatforms();
  }, [orderStatus, dispatch]);
  
  return (
    <CartStyled>
      <h2 className="bg bg-warning title mt-4 mb-2">Cart - Your Order:</h2>
      <div className="container cartGrid pb-5">
        <div className="row border-bottom">
          <div className="col-sm-8">
            <div className="bg bg-white">
              <div className="ps-4 border-bottom cartRedSubtitles">
                <h5 className="text-start pt-1">
                  <span className="text-danger align-middle">
                    Items in cart
                  </span>
                </h5>
              </div>

              <div className="mt-2 pb-4 mt-md-3">
                <table className="table table-sm table-striped tableSize align-middle">
                  <tbody>{content}</tbody>
                </table>
                <CouponAD />
                <button
                  className="btn btn-sm btn-dark mt-2 mt-md-5 buttonClearCart"
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
                <div className="border-top mt-4 mt-sm-4 emailContact">
                  <h6 className="mt-2 mt-md-4 text-primary">
                    If you have any issue with the cart contact us at:
                  </h6>
                  <button className="btn btn-sm btn-outline-primary mt-1">
                    info@futcoinsmarket.net
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* --------------------------------------------- Right side - Cart Total -------------------------------------  */}
          {isMoreThanOnePlatform === true ? null : (
            <div className="col-sm-4 mb-5">
              <div className="bg bg-white">
                <div className="ps-4 border-bottom cartRedSubtitles">
                  <h5 className="text-start pt-1">
                    <span className="text-danger align-middle ">
                      Cart Total:
                    </span>
                  </h5>
                </div>

                <div className="row mt-3">
                  <div className="col-9">
                    <div className="form-outline mb-1 ps-4">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter coupon..."
                        onChange={handleDiscountCoupon}
                      />
                    </div>
                  </div>

                  <div className="col me-1">
                    {/* <button className="btn btn-danger " onClick={discountCupon}> */}
                    <button className="btn btn-danger " onClick={discountCupon}>
                      Apply
                    </button>
                  </div>
                </div>

                <div className="mt-2 cartTotalDetails">
                  <table className="table table-sm table-striped tableSize ">
                    <tbody>
                      <tr>
                        <td className="text-start ps-4">
                          Coins: <FaCoins />{" "}
                          <strong>{getTotalCoins.toLocaleString()}</strong>{" "}
                        </td>
                        <td className="text-end pe-3">
                          SubTotal:{" "}
                          <strong>
                            {getCurrencyData} {getTotal}
                          </strong>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-start ps-4">
                          Payment Fee: <strong>February FREE</strong>
                        </td>
                        <td className="text-end pe-3">
                          Payment: <strong>Paypal</strong>
                        </td>
                      </tr>

                      <tr>
                        <td className="text-start ps-4">
                          Discount Code:{" "}
                          <strong>
                            {getCurrencyData} {discountCoupon}{" "}
                          </strong>
                        </td>
                        <td>{couponPorcent}%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className=" mt-4 pb-2">
                  <h3 className="text-center text-danger" key={1001}>
                    Total:
                    <span>
                      <strong>{parseFloat(totalPrice).toFixed(2)}</strong>
                      {getCurrencyData}
                    </span>
                  </h3>
                  <h5 key={1002}>
                    {" "}
                    USD{" "}
                    {(
                      Math.round(
                        (parseFloat(totalPrice) /
                          parseFloat(actualCurrency())) *
                          100
                      ) / 100
                    ).toFixed(2)}{" "}
                  </h5>
                  <div className="paypalButtonsContainer">
                    <PayPalScriptProvider
                      options={{
                        "client-id":
                          // "Af30CYtkFIjzXLc6bSvSx2jEKxPfccsGLrwnT6TzHq7P7OfeDl8TkISXsGkRrSxsgq2cNDul7sPhqIbe",
                          "AdYrjqJUd70a3MzkrLnNgk_jL1HK28pEUit8z-RFUA7RR7s8NSzx0A16AqTpqX3eSS_497-hBHlo-ZsH",
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
                                  value: totalPriceRef.current,
                                },
                              },
                            ],
                          });
                        }}
                        onApprove={async (data, actions) => {
                          const order = await actions.order.capture();
                          console.log("order:", order);
                          console.log("order ID:", order.id);
                          console.log("order Create Time:", order.create_time);
                          console.log(
                            "order Country:",
                            order.payer.address.country_code
                          );
                          console.log(
                            "order Email Paypal:",
                            order.payer.email_address
                          );
                          console.log(
                            "order Name:",
                            order.payer.name.given_name
                          );
                          console.log(
                            "order Surname:",
                            order.payer.name.surname
                          );
                          console.log(
                            "Price Paid:",
                            order.purchase_units[0].amount.value
                          );

                          handleApprove(
                            data.orderID,
                            order.purchase_units[0].amount.value
                          );
                          window.location.replace("/thanks");
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
            </div>
          )}
        </div>
        <div className="col text-start p-4 mt-3 bg bg-white crypto">
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
          <button className="btn btn-primary mt-3">
            info@futcoinsmarket.net
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

  .title {
    ${titles}
  }

  .textOrderItems span {
      font-size: .85rem;
    }

    .cartRedSubtitles h5 span {
      font-size: 1.2rem;
  }
  .tableDiv{
    margin-top: .5rem!important;
  }
  .buttonClearCart{
    width: 5rem;
    height: 1.5rem;
    font-size: .66rem;
  }

  .emailContact h6{
    font-size: .85rem;
  }
  .cartTotalDetails p, td{
    font-size: .75rem;
  }
  .crypto h5 {
    font-size: 1rem;
  } 

  .tableRowStyled {
    background-color: #f8f9fa;
  }
  
  .removeButon {
    cursor: pointer;
  }
  .paypalButtonsContainer {
    margin: 0 auto;
    button  {
      width: 200px;
    }
    .paypal {
      border: 3px solid red;
      &-logo {
        font-family: Verdana, Tahoma;
        font-weight: 700;
        font-size: 16px;
        
        i:first-child {
          color: #253b80;
        }
        
        i:last-child {
          color: #179bd7;
        }
      }
  }

 
`;
