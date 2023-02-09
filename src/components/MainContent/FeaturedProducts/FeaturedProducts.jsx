import React from "react";
import { FaCoins } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Swal from "sweetalert2";
import { addToCart, getCurrency } from "../../../redux/state/orders";
import { FeaturedProductsData } from "../../data/featuredProducts.data";

const FeaturesProducts = () => {
  const dispatch = useDispatch();
  const getCurrencyData = useSelector(getCurrency);

  const handleButtonAddToCart = (id, coins, price, platform) => {
    Swal.fire({
      icon: "success",
      title: "Added to Cart",
      text: `Added ${coins}K per ${(
        Math.round(parseInt(price) * parseFloat(actualCurrency()) * 100) / 100
      ).toFixed(2)} ${getCurrencyData} in ${platform}`,
      // footer: '<a href="https://futcoinsmarket.net/cart">Go to your Cart</a>',
      footer: '<a href="/cart">Go to your Cart</a>',
    });
    dispatch(addToCart({ id, coins, price, platform, getCurrencyData }));
  };

  let priceToShow;
  const actualCurrency = () => {
    return getCurrencyData === "USD"
      ? (priceToShow = 1.0)
      : getCurrencyData === "CAD"
      ? (priceToShow = 1.3)
      : getCurrencyData === "AUD"
      ? (priceToShow = 1.5)
      : getCurrencyData === "EUR"
      ? (priceToShow = 0.95)
      : getCurrencyData === "GBP"
      ? (priceToShow = 0.82)
      : (priceToShow = 1.0);
  };

  return (
    <ProductStyled>
      <div className="container mt-4">
        <h3 className="text-bg-primary p-2">Featured Products</h3>
        <div className="container mt-4">
          <div className="row row-cols-1 row-cols-sm-4 g-4">
            {!FeaturedProductsData
              ? "Loading..."
              : FeaturedProductsData.map((prod) => (
                  <div className="col" key={prod.id}>
                    <div className="card">
                      {prod.platform === "PS4/5" ? (
                        <span className="pt-2 platformBubble badge bg bg-primary">
                          {prod.platform}{" "}
                        </span>
                      ) : prod.platform === "XB" ? (
                        <span className="pt-2 platformBubble badge bg bg-success">
                          {prod.platform}
                        </span>
                      ) : (
                        <span className="pt-2 platformBubble badge bg bg-warning">
                          {prod.platform}
                        </span>
                      )}
                      <img
                        src={prod.image}
                        className="card-img-top"
                        alt="..."
                      />

                      <div className="card-body">
                        {prod.platform === "PS4/5" ? (
                          <h4 className="text-primary card-text">
                            <FaCoins />{" "}
                            {prod.coins >= 1000000
                              ? prod.coins.toLocaleString().concat(" M")
                              : prod.coins.toLocaleString()}
                          </h4>
                        ) : prod.platform === "XB" ? (
                          <h4 className="text-success card-text">
                            <FaCoins />{" "}
                            {prod.coins >= 1000000
                              ? prod.coins.toLocaleString().concat(" M")
                              : prod.coins.toLocaleString()}
                          </h4>
                        ) : prod.platform === "PC" ? (
                          <h4 className="text-warning card-text">
                            <FaCoins />{" "}
                            {prod.coins >= 1000000
                              ? prod.coins.toLocaleString().concat(" M")
                              : prod.coins.toLocaleString()}
                          </h4>
                        ) : null}
                        <h5 className="card-text">
                          <s>
                            <strong>
                              {getCurrencyData}{" "}
                              {(
                                Math.round(
                                  parseFloat(prod.price) *
                                    parseFloat(actualCurrency()) *
                                    100
                                ) / 100
                              ).toFixed(2)}
                            </strong>
                          </s>
                          <strong className="ms-1 text-danger">
                            {getCurrencyData}{" "}
                            {(
                              Math.round(
                                parseFloat(prod.price * 0.9) *
                                  parseFloat(actualCurrency()) *
                                  100
                              ) / 100
                            ).toFixed(2)}
                          </strong>
                        </h5>
                        {prod.coins >= 1000000 ? (
                          <span className="badge text-bg-danger text-white mb-2">
                            10% OFF - Best Price Guarantee
                          </span>
                        ) : (
                          <span className="badge text-bg-primary text-white mb-2">
                            10% OFF - Best Price Guarantee
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        className="btn btn-warning"
                        onClick={() =>
                          handleButtonAddToCart(
                            prod.id,
                            prod.coins,
                            prod.price,
                            prod.platform
                          )
                        }
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </ProductStyled>
  );
};

export default FeaturesProducts;

const ProductStyled = styled.div`
  .platformBubble {
    width: 4rem;
    height: 2rem;
    position: absolute;
  }
`;
