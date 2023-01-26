import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loadCurrency } from "../../redux/state/orders";

const CurrencyChange = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const handleChangeCurrency = (e) => {
    setValue(e.target.value);
    dispatch(loadCurrency(e.target.value));
  };

  return (
    <>
      <label>
        Currency:
        <select value={value} onChange={handleChangeCurrency}>
          <option value="Choose">
            USD
          </option>
          <option value="CAD">CAD</option>
          <option value="AUD">AUD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="USD">USD</option>
        </select>
      </label>
    </>
  );
};

export default CurrencyChange;
