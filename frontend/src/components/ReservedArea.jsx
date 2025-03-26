import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import Hero from "./Hero";
import { CheckLg, KeyFill } from "react-bootstrap-icons";
import { Link, useLocation } from "react-router-dom";
import MyNavbar from "./MyNavbar";
import img6 from "../assets/images/areaRiservata/img6.jpg";
import img7 from "../assets/images/areaRiservata/img7.jpg";
import img8 from "../assets/images/areaRiservata/img8.jpg";
import img9 from "../assets/images/areaRiservata/img9.jpg";
import img10 from "../assets/images/areaRiservata/img10.jpg";
import img11 from "../assets/images/areaRiservata/img11.jpeg";
import { useEffect, useRef } from "react";
import LoginCard from "./LoginCard";

const ReservedArea = () => {
  const carouselArray = [img6, img7, img8, img9, img10];
  const cardInfo = "Visita la nostra azienda";

  // gestione dello scroll fino alla card di login
  const evaluationRef = useRef(null);

  // recupero lo stato scrollToLogin settato nella navbar durante la navigazione
  const location = useLocation();

  useEffect(() => {
    console.log(location.state);
    console.log(evaluationRef.current);
    if (location.state?.scrollToLogin && evaluationRef.current) {
      evaluationRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <>
      <MyNavbar />
      <Hero carouselImage={carouselArray} cardTitle={cardInfo} />
      <LoginCard ref={evaluationRef} />

      <Container className="mb-4" style={{ marginTop: "60px" }}>
        <Row className="fs-1 fw-bold d-flex justify-content-center text-center mt-4">Entra a far parte della nostra rete!</Row>
        <Row className="lead fs-6 d-flex justify-content-start">
          <Col className="d-flex justify-content-center">
            Con pochi semplici passaggi potrai usufruire di tutti i nostri servizi ed accedere a tutte le promozioni
          </Col>
        </Row>
        <Row className="mt-4">
          <Col className="col-12" md={5} lg={4} xl={3}>
            <Image fluid src={img11} />
          </Col>
          <Col>
            <Row>
              <Col>
                Accedendo alla rete della nostra azienda, avrai l’opportunità di rimanere sempre aggiornato sulle ultime tecnologie delle macchine e sulle
                innovazioni di settore. Inoltre, potrai ricevere notifiche personalizzate su opportunità esclusive per te, come nuove soluzioni, offerte
                speciali e aggiornamenti tecnici. Entra a far parte della nostra rete e scopri come migliorare il tuo lavoro con informazioni sempre aggiornate
                e vantaggi esclusivi!
              </Col>
            </Row>
            <Row className="assistancePoints d-flex flex-column mt-3">
              <Col className="fs-6 d-flex align-items-start">
                <div className="me-3">
                  <CheckLg className="fs-3" />
                </div>
                <div>
                  Offerte personalizzate e&nbsp; <span className="fw-bold">attenzione alle richieste</span>
                </div>
              </Col>
              <Col className="fs-6 d-flex align-items-start">
                <div className="me-3">
                  <CheckLg className="fs-3" />
                </div>
                <div>Tool di calcolo che ti aiutano nella scelta</div>
              </Col>
              <Col className="fs-6 d-flex align-items-start">
                <div className="me-3">
                  <CheckLg className="fs-3" />
                </div>
                <div>
                  Preventivi senza impegno e &nbsp; <span className="fw-bold">assistenza tecnica</span>
                </div>
              </Col>
              <Col className="fs-6 d-flex align-items-start">
                <div className="me-3">
                  <CheckLg className="fs-3" />
                </div>
                <div>Navigazione tra tutti i nostri prodotti</div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ReservedArea;
