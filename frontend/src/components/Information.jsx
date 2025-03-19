import Hero from "./Hero";
import MyNavbar from "./MyNavbar";
import img1 from "../assets/images/assistenza/img1.jpeg";
import img2 from "../assets/images/assistenza/img2.jpg";
import img3 from "../assets/images/assistenza/img3.jpeg";
import img4 from "../assets/images/assistenza/img4.jpeg";
import img5 from "../assets/images/assistenza/img5.jpeg";
import img6 from "../assets/images/assistenza/img6.jpeg";
import { CheckLg } from "react-bootstrap-icons";
import { Col, Container, Image, Row } from "react-bootstrap";

const Information = () => {
  const carouselArray = [img1, img2, img3, img4, img5];
  const cardInfo = "Informazioni utili";

  return (
    <>
      <MyNavbar informationSelected={true} />
      <Hero carouselImage={carouselArray} cardTitle={cardInfo} />
      <Container className="assistance">
        <Row className="fs-1 fw-bold d-flex justify-content-center text-center mt-4">Non esitare a contattarci!</Row>
        <Row className="lead fs-6 d-flex justify-content-start">
          <Col className="d-flex justify-content-center">
            La nostra rete di operatori e tecnici abilitati è sempre pronta ad intervenire in caso di necessità
          </Col>
        </Row>
        <Row className="mt-4">
          <Col className="col-12" md={5} lg={4} xl={3}>
            <Image fluid src={img6} />
          </Col>
          <Col>
            <Row>
              <Col>
                La nostra azienda offre un servizio tecnico altamente qualificato. I nostri professionisti sono abilitati e pronti a intervenire per guasti,
                manutenzioni e installazioni, garantendo efficienza e sicurezza. Inoltre, il nostro servizio clienti è sempre disponibile: gli operatori
                telefonici forniscono assistenza tempestiva e competente per ogni necessità. Affidati a noi per un supporto tecnico affidabile e un’assistenza
                continua.
              </Col>
            </Row>
            <Row className="assistancePoints d-flex flex-column mt-3">
              <Col className="fs-6 d-flex align-items-start">
                <div className="me-3">
                  <CheckLg className="fs-3" />
                </div>
                <div>
                  Interventi di prima accensione e&nbsp; <span className="fw-bold">manutenzione</span>
                </div>
              </Col>
              <Col className="fs-6 d-flex align-items-start">
                <div className="me-3">
                  <CheckLg className="fs-3" />
                </div>
                <div>
                  Supporto tecnico, &nbsp;<span className="fw-bold">assitenza&nbsp;</span> e fornitura sempre puntuale
                </div>
              </Col>
              <Col className="fs-6 d-flex align-items-start">
                <div className="me-3">
                  <CheckLg className="fs-3" />
                </div>
                <div>
                  Manutenzione ordinaria, e riparazione con &nbsp; <span className="fw-bold">pronto intervento</span>
                </div>
              </Col>
              <Col className="fs-6 d-flex align-items-start">
                <div className="me-3">
                  <CheckLg className="fs-3" />
                </div>
                <div>Estensione della garanzia dei prodotti del nostro marchio</div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Information;
