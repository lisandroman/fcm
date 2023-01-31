import React, { useEffect, useState } from "react";
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

const Sell = () => {
  const orderAllData = useSelector(allData);
  const getLatestPriceToForm = useSelector(getLatestPrice);
  const dispatch = useDispatch();


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [platform, setPlatform] = useState("");

  const [sellAmount, setSellAmount] = useState(0);
  const [sellRate, setSellRate] = useState(0);
  const [paypalEmail, setPaypalEmail] = useState("");


  const [originEmail, setOriginEmail] = useState("");
  const [passEmail, setPassEmail] = useState("");
  const [price, setPrice] = useState(0);
  
  const [backupCode1, setBackupCode1] = useState("");
  const [backupCode2, setBackupCode2] = useState("");
  const [backupCode3, setBackupCode3] = useState("");

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
    setSellAmount(getTotalCoins * 1000);
    setPlatform(getFinalPlatform);
    setPrice(getLatestPriceToForm);
  }, [getTotalCoins, getFinalPlatform, getLatestPriceToForm]);

 
  // const addData = async function (e) {
  //   e.preventDefault();
  //   try {
  //     const docRef = await addDoc(collection(db, "orders"), {
  //       name: name,
  //       email: email,
  //       platform: platform,

  //       sellAmount: sellAmount,
  //       sellRate: sellRate,
  //       paypaEmail: paypalEmail,

  //       originEmail: originEmail,
  //       passEmail: passEmail,
  //       price: price,

  //       backupCode1: backupCode1,
  //       backupCode2: backupCode2,
  //       backupCode3: backupCode3,
     
  //       city: city,
  //       state: state,
  //       country: country,
  //     });
  //     console.log("Document written with ID: ", docRef.id);
  //     Swal.fire({
  //       icon: "success",
  //       title: "Form Sended",
  //       text: `Please save your Order ID: ${docRef.id}`,
  //       footer: '<a href="/">Go Home</a>',
  //     });
  //     dispatch(clearCart());
  //   } catch (e) {
  //     console.error("Error adding document: ", e);
  //   }
  // };

  return (
    <>
      <HeaderSellForm className="bg bg-light p-3 mt-4">
        <div className="bg bg-primary p-1 mt-2 mb-4">
          <h2 className="text-white">Sell</h2>
          <p className="text-white">
            Tired of playing FUT and want to get paid for your cards? Sell them
            to us! We offer the most competitive rates on the market for sellers
            and take care of the entire process for you, hassle free! All you
            have to do is fill out the form and we'll handle the rest.
          </p>
        </div>
        <div>
          <h4>Current seller rates:</h4>
          <p>[PS/XB 5M+ minimum] $4.67 USD/100k = £3.60/100k = €4.10/100k</p>
          <p>[PS/XB] $4 USD/100k ≈ £3.10/100k ≈ €3.50/100k</p>
          <p>[PC] $3.33 USD/100k ≈ £2.57/100k ≈ €2.95/100k</p>
          <h4>Requirements to sell:</h4>
          <p>- Web App Transfer Market unlocked</p>
          <p>- Minimum of 1M (1,000,000)</p>
          <p>- Can't be unassigned with 5+ cards</p>
          <h4>How does the process work?</h4>
          <p>
            We will notify you via your email if we accept the sell order within
            24-72 hours or less. Sellers get notified straight away when we
            start the process and from that point it typically (not always)
            takes 24-48 hours or less to complete it. Your payment is sent for
            the exact amount of coins taken via PayPal goods & services within
            24 hours of us completing the order. We fulfill the order via Snipe
            Method.
          </p>
          <h6 className="disclaimer">
            <strong>Disclaimer:</strong> Please note that we aren't obligated to
            fulfill anyone's sell order to any extent and the decision is at our
            own discretion.
          </h6>
        </div>
      </HeaderSellForm>
      <FormStyled className="bg bg-light p-3 mt-4">
        <form className="mt-1 bg bg-light" autoComplete="off">
          <div className="row mb-4">
            <div className="col-md">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  // onChange={(e) => setOriginEmail(e.target.value)}
                />
                <label htmlFor="floatingInput">Name:</label>
              </div>
            </div>
            <div className="col">
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  // onChange={(e) => setPassEmail(e.target.value)}
                />
                <label htmlFor="floatingPassword">Password:</label>
              </div>
            </div>
            <div className="col">
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  // placeholder="Origin Password"
                  // onChange={(e) => setPassEmail(e.target.value)}
                />
                <label htmlFor="floatingPassword">Console:</label>
              </div>
            </div>
          </div>

          {/* -------- Platform and Amount ---------- */}
          <div className="row mb-4">
            <div className="col-md mb-3">
              <div className="form-outline text-start">
                <label htmlFor="floatingCoins">Sell Amount:</label>
                <input
                  type="number"
                  id="floatingCoins"
                  className="form-control"
                  placeholder="Coins Package: `{coins}`"
                  // value={coins}
                />
              </div>
            </div>
            <div className="col-md">
              <div className="form-outline text-start">
                <label htmlFor="floatingPlatform">Sell Rate:</label>
                <input
                  type="text"
                  id="floatingPlatform"
                  className="form-control"
                  placeholder="Platform:"
                  value={platform}
                />
              </div>
            </div>
            <div className="col-md">
              <div className="form-outline text-start">
                <label htmlFor="floatingPrice">Price in USD:</label>
                <input
                  type="number"
                  id="floatingPrice"
                  className="form-control"
                  placeholder="Price:"
                  value={price}
                />
              </div>
            </div>
          </div>

          {/* -------- Origin Data ---------- */}
          <div className="row mb-4">
            <div className="col-md mb-3">
              <div className="form-outline text-start">
                <label htmlFor="floatingCoins">Origin Email:</label>
                <input
                  type="email"
                  id="floatingCoins"
                  className="form-control"
                  placeholder="Origin email..."
                  // value={coins}
                />
              </div>
            </div>
            <div className="col-md">
              <div className="form-outline text-start">
                <label htmlFor="floatingPlatform">Origin Password:</label>
                <input
                  type="text"
                  id="floatingPlatform"
                  className="form-control"
                  placeholder="Origin Password..."
                  value={platform}
                />
              </div>
            </div>
            <div className="col-md">
              <div className="form-outline text-start">
                <label htmlFor="floatingPrice">Paypal Email:</label>
                <input
                  type="email"
                  id="floatingPrice"
                  className="form-control"
                  placeholder="Paypal Email..."
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
                  // onChange={(e) => setBackupCode1(e.target.value)}
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
                  // onChange={(e) => setBackupCode2(e.target.value)}
                />
              </div>
            </div>
            <div className="col-sm">
              <div className="form-outline mb-2">
                <input
                  type="text"
                  id="form3Example3"
                  className="form-control"
                  placeholder="Backup Code3:"
                  // onChange={(e) => setBackupCode2(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* ------ Security Information -------- */}

          <div className="border-top pt-3 mb-3">
            <h5 className="text-primary">Security Information</h5>
            <div className="row">
              <div className="col-md">
                <div className="form-outline mb-2">
                  <input
                    type="text"
                    id="form3Example4"
                    className="form-control"
                    placeholder="City:"
                    // onChange={(e) => setCity(e.target.value)}
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
                    // onChange={(e) => setState(e.target.value)}
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
                    // onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          {sellAmount === 0 ? (
            <p>You don't make an order</p>
          ) : !originEmail ||
            !passEmail ||
            !backupCode1 ||
            !backupCode2 ||
            !email ||
            !city ||
            !state ||
            !country ? (
            [
              <button
                className="btn btn-secondary disabled mb-2"
                // onClick={(e) => addData()}
              >
                Send Form
              </button>,
              <p className="text-danger mt-0">
                Complete the form to enable the button
              </p>,
            ]
          ) : (
            <button className="btn btn-primary mb-4" >
              Send Form
            </button>
          )}
        </form>
      </FormStyled>
    </>
  );
};

export default Sell;

const FormStyled = styled.div`
  width: 80%;
  margin: 0 auto;
  .form-control{
    ::placeholder {
      color: grey;
      font-size: .75rem;
    }
  }

`;

const HeaderSellForm = styled.div`
  width: 80%;
  margin: 0 auto;
  .disclaimer{
    font-size: .75rem;
  }
`;
