import Hero from "./Hero";
import MyNavbar from "./MyNavbar";
import BuildingEvaluation from "./BuildingEvaluation";
import img1 from "../assets/images/homepage/img1.jpg";
import img2 from "../assets/images/homepage/img2.jpg";
import img3 from "../assets/images/homepage/img3.jpg";
import img4 from "../assets/images/homepage/img4.jpg";
import img5 from "../assets/images/homepage/img5.jpg";

const HomePage = () => {
  {
    /* ❗❗❗ CAMBIARE LE IMMAGINI */
  }
  const carouselArray = [img1, img2, img3, img4, img5];

  return (
    <>
      <MyNavbar />
      <Hero carouselImage={carouselArray} />
      <BuildingEvaluation />
    </>
  );
};

export default HomePage;
