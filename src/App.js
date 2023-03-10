import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import "react-tooltip/dist/react-tooltip.css";
import Home from "./components/pages/Home/Home";
import Cart from "./components/pages/Cart/Cart";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Buy from "./components/pages/Buy/Buy";
import Sell from "./components/pages/Sell/Sell";
import Help from "./components/pages/Help/Help";
import Error404 from "./components/pages/Error404/Error404";
import BuyPlayers from "./components/pages/BuyPlayers/BuyPlayers";
import FormWithGameData from "./components/pages/FormWithGameData/FormWithGameData";
import CurrencyChange from "./components/CurrencyChange/CurrencyChange";
import TermsAndConditions from "./components/pages/TermsAndConditions/TermsAndConditions";
import ReactGA from "react-ga";
import { useEffect } from "react";

function App() {
  const location = useLocation();
  const TRACKING_ID = "UA-193575929-1";
  ReactGA.initialize(TRACKING_ID);
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
  return (
    <div className="App">
      <CurrencyChange />
      <Navbar />
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/help" element={<Help />} />
        <Route path="/buy-players" element={<BuyPlayers />} />
        <Route path="/thanks" element={<FormWithGameData />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
