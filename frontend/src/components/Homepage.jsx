import { Container } from "react-bootstrap";
import Hero from "./Hero";
import MyNavbar from "./MyNavbar";
import BuildingEvaluation from "./BuildingEvaluation";

const HomePage = () => {
  return (
    <>
      <MyNavbar />
      <Hero />
      <BuildingEvaluation />
    </>
  );
};

export default HomePage;
