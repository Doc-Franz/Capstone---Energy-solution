import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReservedArea from "./components/ReservedArea";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Footer from "./components/Footer";
import HomePage from "./components/Homepage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/reservedArea" element={<ReservedArea />} />
        <Route path="/reservedArea/login" element={<Login />} />
        <Route path="/reservedArea/registration" element={<Registration />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
