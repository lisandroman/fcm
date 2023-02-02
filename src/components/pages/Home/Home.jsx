import React from "react";
import Header from "../../Header/Header";
import AboutUs from "../../MainContent/AboutUs/AboutUs";
import MainContent from "../../MainContent/ConsoleCards/ConsoleCards";
import FeaturesProducts from "../../MainContent/FeaturedProducts/FeaturedProducts";

const Home = () => {
  return (
    <>
      <Header />
      <MainContent />
      <AboutUs />
      <FeaturesProducts />
      {/* <Fires /> */}
      {/* <ReadFires /> */}
    </>
  );
};

export default Home;
