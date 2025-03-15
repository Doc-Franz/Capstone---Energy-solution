import Hero from "./Hero";
import MyNavbar from "./MyNavbar";
import BuildingEvaluation from "./BuildingEvaluation";
import south from "../assets/images/orientamento/south.svg";
import west from "../assets/images/orientamento/west.svg";
import east from "../assets/images/orientamento/east.svg";
import wall from "../assets/images/muratura/wall.svg";
import airFilter from "../assets/images/muratura/air-filter.svg";

const HomePage = () => {
  {
    /* ❗❗❗ CAMBIARE LE IMMAGINI */
  }
  const carouselArray = [south, west, east, wall, airFilter];

  return (
    <>
      <MyNavbar />
      <Hero carouselImage={carouselArray} />
      <BuildingEvaluation />
    </>
  );
};

export default HomePage;
