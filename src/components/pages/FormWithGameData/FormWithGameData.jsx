import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  allData,
  clearCart,
  getLatestPrice,
} from "../../../redux/state/orders";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const FormWithGameData = () => {
  const orderAllData = useSelector(allData);
  const getLatestPriceToForm = useSelector(getLatestPrice);
  const dispatch = useDispatch();

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

  // Set Coins
  const listTotalCoins = orderAllData.map((item) => item.coins);
  const getTotalCoins = listTotalCoins.reduce((a, b) => {
    return a + b;
  }, 0);
  // Set Platform
  const listFinalPlatform = orderAllData.map((item) => item.platform);
  const getFinalPlatform = listFinalPlatform[0];

  useEffect(() => {
    setCoins(getTotalCoins);
    setPlatform(getFinalPlatform);
    setPrice(getLatestPriceToForm);
  }, [getTotalCoins, getFinalPlatform, getLatestPriceToForm]);

  const addData = async function (e) {
    e.preventDefault();
    let url = "https://paypal.me/fcmtrader?country.x=IL&locale.x=en_US";
    try {
      const docRef = await addDoc(collection(db, "orders"), {
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
        title: "Order Received!",
        text: `Please save your Order ID: ${docRef.id}`,
        html:
          "To pay, please click the button below" +
          `</br>The price of your order is <strong>USD ${price}</strong>`,
        footer: `</br>You must enter the amount on the next screen`,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "PAY with Paypal",
      }).then((result) => {
        if (result.isConfirmed) {
          window.open(url, "_blank");
          dispatch(clearCart());
          window.open('/');
        }
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  // const paypalButton = () => {
  //   let newID = uuidv4();
  //   let id = newID.substring(0, 8);

  //   Swal.fire({
  //     text: "To pay, please click the button below",
  //     html:
  //       `Your Order ID: <strong>${id}</strong>` +
  //       `</br>The price of your order is <strong>USD ${totalPrice}</strong>`,
  //     footer: `</br>You must enter the amount on the next screen`,
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "PAY with Paypal",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       window.open(url, "_blank");
  //       dispatch(clearCart());
  //     }
  //   });
  // };
  return (
    <FormStyled className="bg bg-light p-3 mt-4">
      <form className="mt-1" autoComplete="off">
        <h3 className="mb-4">Complete form to delivery</h3>

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
                value={coins}
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
                value={platform}
              />
            </div>
          </div>
          <div className="col-md">
            <div className="form-outline">
              <label htmlFor="floatingPrice">Price in USD:</label>
              <input
                type="number"
                id="floatingPrice"
                disabled
                className="form-control"
                placeholder="Price:"
                value={price}
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
        {coins === 0 ? (
          [
            <h3>Thanks for your order!</h3>,
            <Link to='/'>
              <button className="btn btn-primary">Go Home</button>
            </Link>,
          ]
        ) : !originEmail ||
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
          <button className="btn btn-primary mb-4" onClick={addData}>
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
