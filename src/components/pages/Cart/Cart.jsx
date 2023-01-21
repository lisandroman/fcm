import React from "react";
import styled from "styled-components";
import { PriceListPS } from "../../data/priceListPS.data";

const Cart = () => {
  return (
    <CartStyled>
      <h2>Cart</h2>
      <h3>Your Order:</h3>
      <div className="container cartGrid">
        <div className="row">
          <div className="col-sm-8">
            <div className="bg bg-white">
              <div className="ps-4 border-bottom">
                <h5 className="text-start text-danger">Items in cart</h5>
              </div>

              <div className="ps-4 pe-4 mt-4 pb-2">
                <table className="table table-sm table-striped tableSize">
                  <tbody>
                    {PriceListPS.map((item) => {
                      return (
                        <tr className="tableRowStyled">
                          <td className="text-start ps-4">{item.coins} K</td>
                          <td>{item.platform}</td>
                          <td className="text-end pe-4">USD {item.price}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="col-sm-4">
            <div className="bg bg-white">
              <div className="ps-4 border-bottom">
                <h5 className="text-start text-danger">Cart Total:</h5>
              </div>

              <div className="mt-4 pb-2 border-bottom">
                <p className="text-start ps-4">Subtotal: </p>
                <p className="text-start ps-4">Payment Fee:</p>
                <p className="text-start ps-4">Payment Method:</p>
              </div>

              <div className="text-start ps-4 mt-4 pb-2">
                <h6>Total:</h6>
              </div>
           
            </div>
              <div>
                <button className="btn btn-danger mt-3">Secure Payment</button>
                  <p className="termsAndConditionsText mt-3">
                    I accept the TERMS & CONDITIONS and Privacy Notice
                  </p>
              </div>
          </div>
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
`;
