import React from "react";
import { FeaturedProductsData } from "../../data/featuredProducts.data";
import styled from "styled-components";

const FeaturesProducts = () => {

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
                        <span
                          className="platformBubble badge xboxbubble"
                        >
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
                        <p className="card-text">Price: ${prod.price}</p>
                      </div>
                      <button type="button" className="btn btn-warning">
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
