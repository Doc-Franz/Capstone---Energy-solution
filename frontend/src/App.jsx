import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyNavbar from "./components/MyNavbar";
import ReservedArea from "./components/ReservedArea";
import Hero from "./components/Hero";

function App() {
  return (
    <BrowserRouter>
      <MyNavbar />
      <Routes>
        <Route path="/reservedArea" element={<ReservedArea />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
