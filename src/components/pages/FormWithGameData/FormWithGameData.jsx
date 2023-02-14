import { addDoc, collection } from "firebase/firestore";
import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Swal from "sweetalert2";
import { db } from "../../../firebase/firebase";
import {
  allData,
  clearCart,
  getLatestPrice,
} from "../../../redux/state/orders";

const FormWithGameData = () => {
  const allDataToDB = useSelector(allData);
  const getLatestPriceToForm = useSelector(getLatestPrice);

  const dispatch = useDispatch();

  const platformInFormToDB = allDataToDB.map((item) => item.platform);
  const coinsInFormToDB = allDataToDB.map((item) => item.coins);
  const getTotalCoins = coinsInFormToDB.reduce((a, b) => {
    return a + b;
  }, 0);

  const formik = useFormik({
    initialValues: {
      paypalID: "",
      originEmail: "",
      originPass: "",
      coins: 0,
      platform: "",
      price: 0,
      backupCode1: "",
      backupCode2: "",
      personalEmail: "",
      city: "",
      state: "",
      country: "",
    },
    onSubmit: async (values) => {
      try {
        const docRef = await addDoc(collection(db, "orders"), {
          paypalID: values.paypalID,
          originEmail: values.originEmail,
          originPass: values.originPass,
          coins: { getTotalCoins },
          platform: {platformInFormToDB},
          price: { getLatestPriceToForm },
          backupCode1: values.backupCode1,
          backupCode2: values.backupCode2,
          personalEmail: values.personalEmail,
          city: values.city,
          state: values.state,
          country: values.country,
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
            window.open("/");
          }
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
  });

  return (
    <FormStyled className="bg bg-light p-3 mt-4">
      <form className="mt-1" autoComplete="off" onSubmit={formik.handleSubmit}>
        <h3 className="mb-4">Complete form to delivery</h3>
        <div className="mb-4 text-start">
          <label htmlFor="paypalID">Paypal Payment ID:</label>
          <input
            id="paypalID"
            name="paypalID"
            type="text"
            className="form-control"
            placeholder="Enter your Paypal Transaction Id"
            onChange={formik.handleChange}
            value={formik.values.paypalID}
          />
        </div>

        <div className="row mb-4">
          <div className="col-md">
            <div className="form-floating mb-3">
              <input
                id="floatingInput originEmail"
                name="originEmail"
                type="email"
                className="form-control"
                placeholder="name@example.com"
                onChange={formik.handleChange}
                value={formik.values.originEmail}
              />
              <label htmlFor="floatingInput">EA Origin Email:</label>
            </div>
          </div>
          <div className="col">
            <div className="form-floating">
              <input
                id="floatingPassword originPass"
                name="originPass"
                type="password"
                className="form-control"
                placeholder="Password"
                onChange={formik.handleChange}
                value={formik.values.originPass}
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
                id="floatingCoins"
                type="number"
                className="form-control"
                disabled
                placeholder="Coins Package: "
                value={getTotalCoins}
                onChange={formik.handleChange}
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
                value={platformInFormToDB[0]}
                onChange={formik.handleChange}
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
                onChange={formik.handleChange}
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
                id="form3Example1 backupCode1"
                name="backupCode1"
                type="text"
                className="form-control"
                placeholder="Backup Code1:"
                onChange={formik.handleChange}
                value={formik.values.backupCode1}
              />
            </div>
          </div>
          <div className="col-sm">
            <div className="form-outline mb-2">
              <input
                id="form3Example2 backupCode2"
                name="backupCode2"
                type="text"
                className="form-control"
                placeholder="Backup Code2:"
                onChange={formik.handleChange}
                value={formik.values.backupCode2}
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
                id="form3Example3 personalEmail"
                name="personalEmail"
                type="email"
                className="form-control"
                placeholder="Personal email:"
                onChange={formik.handleChange}
                value={formik.values.personalEmail}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md">
              <div className="form-outline mb-2">
                <input
                  id="form3Example4 city"
                  name="city"
                  type="text"
                  className="form-control"
                  placeholder="City:"
                  onChange={formik.handleChange}
                  value={formik.values.city}
                />
              </div>
            </div>
            <div className="col-md">
              <div className="form-outline mb-2">
                <input
                  id="form3Example5 state"
                  name="state"
                  type="text"
                  className="form-control"
                  placeholder="State:"
                  onChange={formik.handleChange}
                  value={formik.values.state}
                />
              </div>
            </div>
            <div className="col-md">
              <div className="form-outline mb-2">
                <input
                  id="form3Example6 country"
                  name="country"
                  type="text"
                  className="form-control"
                  placeholder="Country:"
                  onChange={formik.handleChange}
                  value={formik.values.country}
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <button type="submit" className="btn btn-primary mb-2">
            Send Form
          </button>
          <p className="text-danger mt-0">Complete the form</p>
        </div>
      </form>
    </FormStyled>
  );
};

export default FormWithGameData;

const FormStyled = styled.div`
  width: 80%;
  margin: 0 auto;
`;
