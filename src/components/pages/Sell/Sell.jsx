import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Swal from "sweetalert2";
import { db } from "../../../firebase/firebase";

const Sell = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [platform, setPlatform] = useState("");

  const [sellAmount, setSellAmount] = useState(1000000);
  const [sellRate, setSellRate] = useState(0);
  const [price, setPrice] = useState(0);
  
  
  const [originEmail, setOriginEmail] = useState("");
  const [originPass, setOriginPass] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");
  
  const [backupCode1, setBackupCode1] = useState("");
  const [backupCode2, setBackupCode2] = useState("");
  const [backupCode3, setBackupCode3] = useState("");

  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");

  let rate1 = 4.67;
  let rate2 = 4;

  const calculateRate = (e) => {
    setSellAmount(e)
    return e < 5000000
      ? setSellRate(rate2)
      : setSellRate(rate1)
  }

  useEffect(() => {
    setPrice(((sellAmount * sellRate) / 100000).toFixed(2));
    setSellAmount(sellAmount * 1)
  }, [sellRate, sellAmount]);

  let amountFormated = sellAmount.toLocaleString().concat(' M');

  const addData = async function (e) {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "sellers"), {
        name: name,
        email: email,
        platform: platform,

        sellAmount: sellAmount,
        sellRate: sellRate,
        price: price,
        
        originEmail: originEmail,
        originPass: originPass,
        paypaEmail: paypalEmail,

        backupCode1: backupCode1,
        backupCode2: backupCode2,
        backupCode3: backupCode3,
     
        city: city,
        state: state,
        country: country,
      });
      console.log("Document written with ID: ", docRef.id);
      Swal.fire({
        icon: "success",
        title: "Form Sended",
        text: `We'll be in touch`,
        footer: '<a href="/">Go Home</a>',
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

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
                  onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="floatingInput">Name:</label>
              </div>
            </div>
            <div className="col">
              <div className="form-floating">
                <input
                  type="email"
                  className="form-control"
                  id="floatingEmail"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="floatingPassword">Email:</label>
              </div>
            </div>
            <div className="col">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="floatingPassword"
                  onChange={(e) => setPlatform(e.target.value)}
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
                  id="floatingAmount"
                  className="form-control"
                  step="100000"
                  placeholder="Minimum 1M (1.000.000)"
                  onChange={(e) => calculateRate(e.target.value)}
                />
                {sellAmount < 1000000 && (
                  <p className="text-danger">Minimum 1M (1.000.000)</p>
                )}
                <p>Your amount: {amountFormated}</p>
              </div>
            </div>
            <div className="col-md">
              <div className="form-outline text-start">
                <label htmlFor="floatingPlatform">Sell Rate:</label>
                <input
                  type="text"
                  id="floatingRate"
                  className="form-control"
                  placeholder="Platform:"
                  value={sellRate}
                  disabled
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
                  disabled
                  onChange={(e) => setPrice(e.target.value)}
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
                  id="floatingOemail"
                  className="form-control"
                  placeholder="Origin email..."
                  onChange={(e) => setOriginEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md">
              <div className="form-outline text-start">
                <label htmlFor="floatingPlatform">Origin Password:</label>
                <input
                  type="text"
                  id="floatingOpass"
                  className="form-control"
                  placeholder="Origin Password..."
                  onChange={(e) => setOriginPass(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md">
              <div className="form-outline text-start">
                <label htmlFor="floatingPrice">Paypal Email:</label>
                <input
                  type="email"
                  id="floatingPaypal"
                  className="form-control"
                  placeholder="Paypal Email..."
                  onChange={(e) => setPaypalEmail(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* ---------- Backup Codes ---------- */}
          <h5 className="text-start text-primary">Backup Codes:</h5>
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
            <div className="col-sm">
              <div className="form-outline mb-2">
                <input
                  type="text"
                  id="form3Example3"
                  className="form-control"
                  placeholder="Backup Code3:"
                  onChange={(e) => setBackupCode3(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* ------ Security Information -------- */}

          <div className="border-top pt-3 mb-3 text-start">
            <h5 className="text-primary">Security Information</h5>
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
          {sellAmount < 1000000 ? (
            <p>Minimum Amount must be 1 Million (1.000.000) coins</p>
          ) : 
            !name ||
            !email ||
            !platform ||
            !sellAmount ||
            !sellRate ||
            !price ||
            !originEmail ||
            !originPass ||
            !paypalEmail ||
            !backupCode1 ||
            !backupCode2 ||
            !backupCode3 ||
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
