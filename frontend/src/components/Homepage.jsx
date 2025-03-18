import Hero from "./Hero";
import MyNavbar from "./MyNavbar";
import BuildingEvaluation from "./BuildingEvaluation";
import img1 from "../assets/images/homepage/img1.jpg";
import img2 from "../assets/images/homepage/img2.jpg";
import img3 from "../assets/images/homepage/img3.jpg";
import img4 from "../assets/images/homepage/img4.jpg";
import img5 from "../assets/images/homepage/img5.jpg";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Button, Row } from "react-bootstrap";

const HomePage = () => {
  {
    /* ❗❗❗ CAMBIARE LE IMMAGINI */
  }
  const carouselArray = [img1, img2, img3, img4, img5];
  const cardInfo = "Richiedi subito un preventivo gratuito";

  // gestione dello scroll fino a building evaluation
  const evaluationRef = useRef(null);

  // recupero lo stato scrollToEvaluation settato nella navbar durante la navigazione
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollToEvaluation && evaluationRef.current) {
      evaluationRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <>
      <MyNavbar />
      <Hero carouselImage={carouselArray} cardTitle={cardInfo} />
      <BuildingEvaluation ref={evaluationRef} />
    </>
  );
};

export default HomePage;
