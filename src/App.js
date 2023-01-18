import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./components/pages/Home/Home";
import Cart from "./components/pages/Cart/Cart";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Buy from "./components/pages/Buy/Buy";
import Sell from "./components/pages/Sell/Sell";
import Help from "./components/pages/Help/Help";
import Error404 from "./components/pages/Error404/Error404";

function App() {

  const location = useLocation();

  return (
    <div className="App">
      <Navbar />
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<Home/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/buy' element={<Buy/>} />
        <Route path='/sell' element={<Sell/>} />
        <Route path='/help' element={<Help/>} />
        <Route path='*' element={<Error404/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

