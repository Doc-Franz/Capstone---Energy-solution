import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReservedArea from "./components/ReservedArea";
import Registration from "./components/Registration";
import Footer from "./components/Footer";
import HomePage from "./components/Homepage";
import AllProducts from "./components/AllProducts";
import Geothermic from "./components/Geothermic";
import HeatPump from "./components/HeatPump";
import TraditionalBoiler from "./components/TraditionalBoiler";
import CondensingBoiler from "./components/CondensingBoiler";
import DetailsProduct from "./components/DetailsProduct";
import Success from "./components/Success";
import Cancel from "./components/Cancel";
import BuildingEvaluationPreventive from "./components/BuildingEvaluationPreventive";
import SearchProducts from "./components/SearchProducts";
import { useEffect, useState } from "react";
import { Button, Image, Row } from "react-bootstrap";
import goUp from "../src/assets/images/goup.svg";
import Login from "./components/Login.jsx";
import Assistance from "./components/Assistance";
import Quotes from "./components/Quotes";
import Information from "./components/Information";
import Photovoltaic from "./components/Photovoltaic";

function App() {
  // gestione dello scroll all'interno delle pagine
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // l'event listener viene rimosso quando il componente si smonta
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [window.scrollY]);

  const handleScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <BrowserRouter>
      <div className="appContainer">
        <div className="routeContainer">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/quotes/:userId" element={<Quotes />} />
            <Route path="/assistance" element={<Assistance />} />
            <Route path="/information" element={<Information />} />
            <Route path="/photovoltaic" element={<Photovoltaic />} />
            <Route path="/reservedArea" element={<ReservedArea />} />
            <Route path="/reservedArea/login" element={<Login />} />
            <Route path="/reservedArea/registration" element={<Registration />} />
            <Route path="/allProducts" element={<AllProducts />} />
            <Route path="/search/:product" element={<SearchProducts />} />
            <Route path="/preventiveProducts/:machine/:power" element={<BuildingEvaluationPreventive />} />
            <Route path="/geothermic" element={<Geothermic />} />
            <Route path="/heatPump" element={<HeatPump />} />
            <Route path="/traditionalBoiler" element={<TraditionalBoiler />} />
            <Route path="/condensingBoiler" element={<CondensingBoiler />} />
            <Route path="/detailsProduct/:username/:heaterId" element={<DetailsProduct />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
          </Routes>
        </div>
        <div>
          <Footer />
        </div>
      </div>
      {isScrolling && (
        <Row>
          <Button
            className="goUp rounded-circle"
            style={{
              backgroundColor: "rgb(202, 202, 202)",
              border: "none",
              width: "50px",
              height: "50px",
              position: "fixed",
              top: "90%",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 999,
              opacity: 0.4
            }}
            onClick={handleScroll}
          >
            <Image fluid src={goUp} />
          </Button>
        </Row>
      )}
    </BrowserRouter>
  );
}

export default App;
