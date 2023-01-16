import React from "react";
import { FeaturedProductsData } from "../../data/featuredProducts.data";

const FeaturesProducts = () => {
  console.log(FeaturedProductsData);

  return (
    <div className="container">
      <h3 className="text-bg-primary p-3">Featured Products</h3>
      <div className="container mt-5">
        <div className="row row-cols-1 row-cols-sm-4 g-4">
          {!FeaturedProductsData
            ? "Loading..."
            : FeaturedProductsData.map((prod) => (
                <div className="col" key={prod.id}>
                  <div className="card">
                    <img src={prod.image} className="card-img-top" alt="..." />
                    <div className="card-body">
                      <h5 className="card-title">{prod.platform}</h5>
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
  );
};

export default FeaturesProducts;
