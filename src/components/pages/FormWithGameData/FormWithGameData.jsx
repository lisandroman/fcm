import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  clearCart,
  getLatestCoins,
  getLatestOrderID,
  getLatestPlatform,
  getLatestPrice,
} from "../../../redux/state/orders";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import Swal from "sweetalert2";

const FormWithGameData = () => {

  const getLatestOrderIDToForm = useSelector(getLatestOrderID);
  const getLatestCoinsToForm = useSelector(getLatestCoins);
  const getLatestPlatformToForm = useSelector(getLatestPlatform);
  const getLatestPriceToForm = useSelector(getLatestPrice);


  // console.log("getLatestOrderIDToForm:", getLatestOrderIDToForm);
  // console.log("getLatestCoinsToForm:", getLatestCoinsToForm);
  // console.log("getLatestPlatformToForm:", getLatestPlatformToForm);
  // console.log("getLatestPriceToForm:", getLatestPriceToForm);
  // console.log("getLatestPriceToForm:", getLatestPriceToForm);

  const dispatch = useDispatch();

  const [paypalID, setPaypalID] = useState("");
  const [originEmail, setOriginEmail] = useState("");
  const [passEmail, setPassEmail] = useState("");
  const [coins, setCoins] = useState(0);
  const [platform, setPlatform] = useState("");
  const [price, setPrice] = useState(0);
  const [backupCode1, setBackupCode1] = useState("");
  const [backupCode2, setBackupCode2] = useState("");
  const [personalEmail, setPersonalEmail] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    setPaypalID(getLatestOrderIDToForm);
    setCoins(getLatestCoinsToForm);
    setPlatform(getLatestPlatformToForm[0]);
    setPrice(getLatestPriceToForm);
  }, [setPaypalID, setCoins, setPlatform, setPrice]);

   console.log("paypalID:", paypalID);
   console.log("platform:", platform);
   console.log("coins:", coins);
   console.log("price:", price);


  const addData = async function (e) {
    try {
      const docRef = await addDoc(collection(db, "orders"), {
        paypalID: paypalID,
        originEmail: originEmail,
        passEmail: passEmail,
        coins: coins,
        platform: platform,
        price: price,
        backupCode1: backupCode1,
        backupCode2: backupCode2,
        personalEmail: personalEmail,
        city: city,
        state: state,
        country: country,
      });
      console.log("Document written with ID: ", docRef.id);
      Swal.fire({
        icon: "success",
        title: "Thanks for your order!",
        text: `Please save your Order ID: ${docRef.id}`,
        footer: `</br>We'll in touch ASAP`,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Home",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(clearCart());
          window.open('/');
        }
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
 


  return (
    <FormStyled className="bg bg-light p-3 mt-4">
      <form className="mt-1" autoComplete="off">
        <h3 className="mb-4">Complete form to delivery</h3>
        <div className="mb-4 text-start">
          <label htmlFor="paypalID">Paypal Payment ID:</label>
          <input
            type="text"
            id="paypalID"
            className="form-control"
            // placeholder={getLatestOrderIDToForm}
            value={getLatestOrderIDToForm}
            disabled
            onChange={(e) => setPaypalID(e.target.value)}
          />
        </div>

        <div className="row mb-4">
          <div className="col-md">
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                onChange={(e) => setOriginEmail(e.target.value)}
              />
              <label htmlFor="floatingInput">EA Origin Email:</label>
            </div>
          </div>
          <div className="col">
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                onChange={(e) => setPassEmail(e.target.value)}
              />
              <label htmlFor="floatingPassword">Password:</label>
            </div>
          </div>
        </div>

        {/* -------- Platform and Amount ---------- */}
        <div className="row mb-4">
          <div className="col-md mb-3">
            <div className="form-outline">
              <label htmlFor="floatingCoins">Coins:</label>
              <input
                type="number"
                id="floatingCoins"
                className="form-control"
                disabled
                placeholder="Coins Package: `{coins}`"
                value={getLatestCoinsToForm}
                onChange={(e) => setCoins(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md">
            <div className="form-outline">
              <label htmlFor="floatingPlatform">Platform:</label>
              <input
                type="text"
                id="floatingPlatform"
                disabled
                className="form-control"
                placeholder="Platform:"
                value={getLatestPlatformToForm[0]}
              />
            </div>
          </div>
          <div className="col-md">
            <div className="form-outline">
              <label htmlFor="floatingPrice">Paid in USD:</label>
              <input
                type="number"
                id="floatingPrice"
                disabled
                className="form-control"
                placeholder="Price:"
                value={getLatestPriceToForm}
              />
            </div>
          </div>
        </div>

        {/* ---------- Backup Codes ---------- */}
        <h5 className="text-start">Backup Codes:</h5>
        <div className="row mb-3">
          <div className="col-sm">
            <div className="form-outline mb-2">
              <input
                type="text"
                id="form3Example1"
                className="form-control"
                placeholder="Backup Code1:"
                onChange={(e) => setBackupCode1(e.target.value)}
              />
            </div>
          </div>
          <div className="col-sm">
            <div className="form-outline mb-2">
              <input
                type="text"
                id="form3Example2"
                className="form-control"
                placeholder="Backup Code2:"
                onChange={(e) => setBackupCode2(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* ------ Security Information -------- */}

        <div className="border-top pt-3 mb-3">
          <h5 className="text-primary">Security Information</h5>
          <div className="col">
            <div className="form-outline mb-2">
              <input
                type="email"
                id="form3Example3"
                className="form-control"
                placeholder="Personal email:"
                onChange={(e) => setPersonalEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md">
              <div className="form-outline mb-2">
                <input
                  type="text"
                  id="form3Example4"
                  className="form-control"
                  placeholder="City:"
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md">
              <div className="form-outline mb-2">
                <input
                  type="text"
                  id="form3Example5"
                  className="form-control"
                  placeholder="State:"
                  onChange={(e) => setState(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md">
              <div className="form-outline mb-2">
                <input
                  type="text"
                  id="form3Example6"
                  className="form-control"
                  placeholder="Country:"
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        {!originEmail ||
        !passEmail ||
        !backupCode1 ||
        !backupCode2 ||
        !personalEmail ||
        !city ||
        !state ||
        !country ? (
          [
            <button
              className="btn btn-secondary disabled mb-2"
              onClick={(e) => addData()}
            >
              Send Form
            </button>,
            <p className="text-danger mt-0">
              Complete the form to enable the button
            </p>,
          ]
        ) : (
          <button className="btn btn-primary mb-4" onClick={(e) => addData()}>
            Send Form
          </button>
        )}
      </form>
    </FormStyled>
  );
};

export default FormWithGameData;

const FormStyled = styled.div`
  width: 80%;
  margin: 0 auto;
`;
