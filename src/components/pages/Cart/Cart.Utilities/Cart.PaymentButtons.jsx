import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { allData } from "../../../../redux/state/orders";

const PaymentButtons = () => {
  const orderAllData = useSelector(allData);
  const takeOrderPrices = orderAllData.map((item) => item.price);
  const getTotal = takeOrderPrices.reduce((a, b) => {
    return a + b;
  }, 0);
  let finalPrice = getTotal - (getTotal * 10) / 100;

  console.log("getTotal de BUTTONS:", finalPrice);
  return (
    <PaymentsButtonsStyled>
      <h3 className="border-top mt-4 pt-3">Payments:</h3>
      <button className="btn btn-primary mb-4">
        info@futcoinsmarket.net
      </button>
    </PaymentsButtonsStyled>
  );
};

export default PaymentButtons;

const PaymentsButtonsStyled = styled.div`
`;
