import React from "react";
import styled from "styled-components";

const FormWithGameData = () => {
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
              />
              <label htmlFor="floatingPassword">Password:</label>
            </div>
          </div>
        </div>

        {/* -------- Platform and Amount ---------- */}
        <div className="row mb-4">
          <div className="col-md mb-3">
            <div className="form-outline">
              <input
                type="email"
                className="form-control"
                id="floatingInputGrid"
                placeholder="Coins Package"
                // value="Coins Package:"
              />
            </div>
          </div>
          <div className="col-md">
            <div className="form-outline">
              <select className="form-select" id="floatingSelectGrid">
                <option defaultValue>Platform</option>
                <option value="1">PS4/PS5</option>
                <option value="2">XBOX</option>
                <option value="3">PC</option>
              </select>
            </div>
          </div>
        </div>

        {/* ---------- Backup Codes ---------- */}
        <h5 className="text-start">
          Backup Codes:
          {/* <button
            type="button"
            className="ms-2 btn btn-sm btn-secondary"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            data-bs-custom-class="custom-tooltip"
            data-bs-title="This top tooltip is themed via CSS variables."
          >
            ?
          </button> */}
        </h5>
        <div className="row mb-3">
          <div className="col-sm">
            <div className="form-outline mb-2">
              <input
                type="text"
                id="form3Example1"
                className="form-control"
                placeholder="Backup Code1:"
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
                type="text"
                id="form3Example3"
                className="form-control"
                placeholder="Personal email:"
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
                />
              </div>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary btn-block mb-4">
          Send Form
        </button>
      </form>
    </FormStyled>
  );
};

export default FormWithGameData;

const FormStyled = styled.div`
  width: 80%;
  margin: 0 auto;
`;
