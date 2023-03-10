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
    <div className="mt-2 mb-2">
      <label className="text-white">
        Currency:{" "}
        <select
          className="form-select-sm"
          value={value}
          aria-label="Default select example"
          onChange={handleChangeCurrency}
        >
          <option value="USD">USD</option>
          <option value="CAD">CAD</option>
          <option value="AUD">AUD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
        </select>
      </label>
    </div>
  );
};

export default CurrencyChange;
