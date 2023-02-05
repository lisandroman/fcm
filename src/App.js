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

function App() {

  const location = useLocation();

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
        <Route path="/form-game-data" element={<FormWithGameData />}
        />
        <Route path="*" element={<Error404 />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

