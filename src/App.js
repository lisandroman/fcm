import "./App.css";
import AboutUs from "./components/MainContent/AboutUs/AboutUs";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/ConsoleCards/ConsoleCards";
import Navbar from "./components/Navbar/Navbar";
import FeaturesProducts from "./components/MainContent/FeaturedProducts/FeaturedProducts";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Header />
      <MainContent />
      <AboutUs />
      <FeaturesProducts />
      <Footer />
    </div>
  );
}

export default App;

