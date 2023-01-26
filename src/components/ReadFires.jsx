import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  allData,
  fetchData,
  getDataErrors,
  getDataStatus,
} from "../redux/state/orders";

const ReadFires = () => {

  const dispatch = useDispatch();
  const orderAllData = useSelector(allData);
  const orderStatus = useSelector(getDataStatus);
  const orderErrors = useSelector(getDataErrors);

  console.log("Log desde JSX:", orderAllData);
  let content;

  if (orderStatus === "loading") {
    content = <h2>Loading...</h2>;
  } else if (orderStatus === "succeeded") {
    content = orderAllData?.map((prod, index) => (
      <div key={index}>
        <h3>Data: {prod.price}</h3>
      </div>
    ));
  } else if (orderStatus === "failed") {
    content = <p>{orderErrors}</p>;
  }

  useEffect(() => {
    if (orderStatus === "idle") {
      dispatch(fetchData());
    }
  }, [orderStatus, dispatch]);

  return (
    <div>
      <button className="btn btn-outline-success">
        READ DATA FROM FIRESTORE
      </button>
      {content}
    </div>
  );
};

export default ReadFires;
