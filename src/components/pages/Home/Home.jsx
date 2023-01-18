import React from 'react'
import Navbar from '../../Navbar/Navbar';
import Header from '../../Header/Header';
import MainContent from '../../MainContent/ConsoleCards/ConsoleCards';
import AboutUs from '../../MainContent/AboutUs/AboutUs';
import FeaturesProducts from '../../MainContent/FeaturedProducts/FeaturedProducts';
import Footer from '../../Footer/Footer';

const Home = () => {
  return (
    <>
      <Header />
      <MainContent/>
      <AboutUs />
      <FeaturesProducts />
      {/* <Footer /> */}
    </>
  );
}

export default Home