import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyNavbar from "./components/MyNavbar";
import ReservedArea from "./components/ReservedArea";
import Login from "./components/Login";
import Registration from "./components/Registration";

function App() {
  return (
    <BrowserRouter>
      <MyNavbar />
      <Routes>
        <Route path="/reservedArea" element={<ReservedArea />} />
        <Route path="/reservedArea/login" element={<Login />} />
        <Route path="/reservedArea/registration" element={<Registration />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
