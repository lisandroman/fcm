import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  allData,
  removeFromCart,
} from "../../../../redux/state/orders";
import Swal from "sweetalert2";

const CoverTax = () => {
  const orderAllData = useSelector(allData);
  const dispatch = useDispatch();
  const [isTaxAccepted, setIsTaxAccepted] = useState(false);

  const readOrderCoins = orderAllData.map((item) => item.coins);
  const readOrderCoinsTotal = readOrderCoins.reduce((a, b) => {
    return a + b;
  }, 0);

  let readOrderPlatform = "";

  const ReReadOrderPlatform = () => {
    return !orderAllData.length
      ? (readOrderPlatform = "")
      : (readOrderPlatform = orderAllData[0].platform);
  };

  const id = 74;
  const coins = (readOrderCoinsTotal * 5) / 100;
  const price = coins * 0.11;
  const platform = ReReadOrderPlatform();

  //console.log('Total Coins in Order:', readOrderCoinsTotal)
  // console.log("Total coins:", coins * 1000)
  // console.log("Price x Tax:", price)

  const handleAddCoinsToPayTax = () => {
    Swal.fire({
      icon: "success",
      title: "Added Tax Fee to the Cart",
      text: `Added ${coins}K in ${platform} for Tax`,
    });
    setIsTaxAccepted(true);
    dispatch(addToCart({ id, coins, price, platform }));
    if (isTaxAccepted !== false) {
      dispatch(removeFromCart(id));
      setIsTaxAccepted(false);
      Swal.fire({
        icon: "error",
        title: "Tax Removed",
      });
    }
  };

  return (
    <div className="mt-2">
      <h4 className="text-danger">Add Tax</h4>
      <p>If you want to cover the tax, you can pay it now!</p>
      {orderAllData &&
      orderAllData.map((item) => item.id).includes(74) ? null : (
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            id="inlineCheckbox1"
            value={isTaxAccepted}
            onChange={handleAddCoinsToPayTax}
          />
          <label className="form-check-label" htmlFor="inlineCheckbox1">
            Add 5% Transfers Tax
          </label>
        </div>
      )}
    </div>
  );
};

export default CoverTax;
