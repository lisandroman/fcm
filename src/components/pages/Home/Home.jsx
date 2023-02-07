import React from "react";
import Header from "../../Header/Header";
import AboutUs from "../../MainContent/AboutUs/AboutUs";
import MainContent from "../../MainContent/ConsoleCards/ConsoleCards";
import FeaturesProducts from "../../MainContent/FeaturedProducts/FeaturedProducts";
import Reviews from "../../Reviews/Reviews";

const Home = () => {
  return (
    <>
      <Header />
      <Reviews />
      <MainContent />
      <AboutUs />
      <FeaturesProducts />
      {/* <Fires /> */}
      {/* <ReadFires /> */}
    </>
  );
};

export default Home;
