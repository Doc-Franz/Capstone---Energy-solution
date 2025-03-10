import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReservedArea from "./components/ReservedArea";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Footer from "./components/Footer";
import HomePage from "./components/Homepage";
import AllProducts from "./components/AllProducts";
import Geothermic from "./components/Geothermic";
import HeatPump from "./components/HeatPump";
import TraditionalBoiler from "./components/TraditionalBoiler";
import CondensingBoiler from "./components/CondensingBoiler";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/reservedArea" element={<ReservedArea />} />
        <Route path="/reservedArea/login" element={<Login />} />
        <Route path="/reservedArea/registration" element={<Registration />} />
        <Route path="/allProducts" element={<AllProducts />} />
        <Route path="/geothermic" element={<Geothermic />} />
        <Route path="/heatPump" element={<HeatPump />} />
        <Route path="/traditionalBoiler" element={<TraditionalBoiler />} />
        <Route path="/condensingBoiler" element={<CondensingBoiler />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
