import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaUserCircle } from "react-icons/fa";
import { FaCoins } from "react-icons/fa";
import { BsStarFill } from "react-icons/bs";
import { BsStar } from "react-icons/bs";
import { db } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
const Reviews = () => {
  const [rev, setRev] = useState({});

  const loadData = async function () {
    try {
      const querySnapshot = await getDocs(collection(db, "reviews"));
      const getReviews = querySnapshot.docs.map((doc) => doc.data());
      setRev(getReviews);
    } catch (e) {
      console.error("Error loading documents: ", e);
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  console.log(rev);
  return (
    <ReviewsStyled className="reviews bg bg-light mt-4 p-3">
      <h4 className="mt-3 mb-0">Trusted by more than 2000 customers </h4>
      <h6 className="p-3 text-success">
        Rated 4.9 out 5 based on 2137 reviews in futcoinsmarket.net{" "}
        <strong>Excellent</strong>
      </h6>
      <div className="row row-cols-1 row-cols-md-4 g-2 mb-2">
        {!rev.length ? (
          <h1>Loading...</h1>
        ) : (
          rev?.map((item, index) => (
            <div className="col" key={index}>
              <div
                key={index}
                className="card border mb-3 justify-content-center"
                style={{ maxWidth: "18rem" }}
              >
                <div className="card-header">
                  <FaUserCircle className="icons-color" /> {item.name}
                </div>
                <div className="card-body ">
                  <h6 className="text-success">
                    {item.stars === 5 ? (
                      <div>
                        <BsStarFill />
                        <BsStarFill />
                        <BsStarFill />
                        <BsStarFill />
                        <BsStarFill />
                      </div>
                    ) : item.stars === 4 ? (
                      <div>
                        <BsStarFill />
                        <BsStarFill />
                        <BsStarFill />
                        <BsStarFill />
                        <BsStar />
                      </div>
                    ) : item.stars === 3 ? (
                      <div>
                        <BsStarFill />
                        <BsStarFill />
                        <BsStarFill />
                        <BsStar />
                        <BsStar />
                      </div>
                    ) : item.stars === 2 ? (
                      <div>
                        <BsStarFill />
                        <BsStarFill />
                        <BsStar />
                        <BsStar />
                        <BsStar />
                      </div>
                    ) : item.stars === 1 ? (
                      <div>
                        <BsStarFill />
                        <BsStar />
                        <BsStar />
                        <BsStar />
                        <BsStar />
                      </div>
                    ) : null}
                  </h6>
                  <h5 className="card-title">
                    <FaCoins /> {item.product}
                  </h5>
                  <p className="card-text">{item.text}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </ReviewsStyled>
  );
};

export default Reviews;

const ReviewsStyled = styled.div`
  width: 80%;
  margin: 0 auto;

  .card {
    margin: 0 auto;
  }
  .card-header {
    font-weight: bold;
  }
  .card-text,
  .icons-color,
  .card-title {
    color: #3f3351;
  }
`;
