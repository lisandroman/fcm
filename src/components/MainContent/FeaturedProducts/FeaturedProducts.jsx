import React from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { FeaturedProductsData } from "../../data/featuredProducts.data";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getCurrency } from "../../../redux/state/orders";

const FeaturesProducts = () => {
  const dispatch = useDispatch();
  const getCurrencyData = useSelector(getCurrency);

  console.log("Selected Currency: ", getCurrencyData);

  const handleButtonAddToCart = (id, coins, price, platform) => {
    Swal.fire({
      icon: "success",
      title: "Added to Cart",
      text: `Added ${coins}K per ${(
        Math.round(parseInt(price) * parseFloat(actualCurrency()) * 100) / 100
      ).toFixed(2)} ${getCurrencyData} in ${platform}`,
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
      <div className="container">
        <h3 className="text-bg-primary p-3">Featured Products</h3>
        <div className="container mt-5">
          <div className="row row-cols-1 row-cols-sm-4 g-4">
            {!FeaturedProductsData
              ? "Loading..."
              : FeaturedProductsData.map((prod) => (
                  <div className="col" key={prod.id}>
                    <div className="card">
                      {prod.platform === "PS" ? (
                        <span className="platformBubble badge psbubble">
                          {prod.platform}{" "}
                        </span>
                      ) : prod.platform === "XB" ? (
                        <span className="platformBubble badge xboxbubble">
                          {prod.platform}
                        </span>
                      ) : (
                        <span className="platformBubble badge pcbubble">
                          {prod.platform}
                        </span>
                      )}
                      <img
                        src={prod.image}
                        className="card-img-top"
                        alt="..."
                      />

                      <div className="card-body">
                        <p className="card-text">{prod.coins}K</p>
                        <h5 className="card-text">
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
                        </h5>
                        {prod.coins >= 1000 ? (
                          <span className="badge text-bg-danger text-white mb-2">
                            5% OFF at checkout
                          </span>
                        ) : (
                          <span className="badge text-bg-primary text-white mb-2">
                            Best Price Guarantee
                          </span>
                        )
                        }
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
    width: 3rem;
    position: absolute;
  }
  .psbubble {
    background: blue;
  }
  .xboxbubble {
    background: green;
  }
  .pcbubble {
    background: orange;
  }
`;
