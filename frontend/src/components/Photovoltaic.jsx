import Hero from "./Hero";
import MyNavbar from "./MyNavbar";
import img1 from "../assets/images/fotovoltaico/img1.jpeg";
import img2 from "../assets/images/fotovoltaico/img2.jpeg";
import img3 from "../assets/images/fotovoltaico/img3.jpeg";
import img4 from "../assets/images/fotovoltaico/img4.jpeg";
import img5 from "../assets/images/fotovoltaico/img5.jpeg";
import piano from "../assets/images/tetto/piano.svg";
import falde from "../assets/images/tetto/falde.svg";
import { CheckLg } from "react-bootstrap-icons";
import { Button, Card, Col, Container, Form, Image, InputGroup, Row } from "react-bootstrap";
import { useState } from "react";

const Photovoltaic = () => {
  const carouselArray = [img1, img2, img3, img4, img5];
  const cardInfo = "Fotovoltaico";

  // al cambio di pagina lo stato del componente viene resettato
  const [startEvaluation, setStartEvaluation] = useState(false);

  const handleStartEvaluation = () => {
    setStartEvaluation(true);
  };

  return (
    <>
      <MyNavbar photovoltaicSelected={true} />
      <Hero carouselImage={carouselArray} cardTitle={cardInfo} />
      <Container className="assistance">
        <Row className="fs-1 fw-bold d-flex justify-content-center text-center mt-4">Calcola il tuo risparmio</Row>
        <Row className="lead fs-6 d-flex justify-content-start">
          <Col className="d-flex justify-content-center">Rispondendo a poche semplici domande possiamo calcolare il tuo possibile risparmio in bolletta</Col>
        </Row>

        {!startEvaluation ? (
          <Row className="d-flex justify-content-center mt-4">
            <Button className="btnEvaluation" onClick={handleStartEvaluation}>
              INIZIA SUBITO
            </Button>
          </Row>
        ) : null}
        <Row className="mt-4">
          <Col>
            <Row>
              <Col>Tipologia tetto</Col>
            </Row>
            <Row>
              <Col className="col-12 mt-2 justify-content-center">
                <Card className="cardSelection" style={{ cursor: "pointer" }}>
                  <Card.Img className="my-3 px-2" variant="top" src={piano} />
                  <Card.Text className="text-center mb-3 mx-2">Tetto piano</Card.Text>
                </Card>
              </Col>
              <Col className="col-12 mt-2 justify-content-center">
                <Card className="cardSelection" style={{ cursor: "pointer" }}>
                  <Card.Img className="my-3 px-2" variant="top" src={falde} />
                  <Card.Text className="text-center mb-3 mx-2">Tetto a falde</Card.Text>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col>Regione di provenienza</Col>
            </Row>
            <Row>
              <Col>
                <Form.Select className="formRegion mb-3" htmlSize={3}>
                  <option value="abruzzo">Abruzzo</option>
                  <option value="basilicata">Basilicata</option>
                  <option value="calabria">Calabria</option>
                  <option value="campania">Campania</option>
                  <option value="emilia-romagna">Emilia-Romagna</option>
                  <option value="friuli-venezia-giulia">Friuli-Venezia Giulia</option>
                  <option value="lazio">Lazio</option>
                  <option value="liguria">Liguria</option>
                  <option value="lombardia">Lombardia</option>
                  <option value="marche">Marche</option>
                  <option value="molise">Molise</option>
                  <option value="piemonte">Piemonte</option>
                  <option value="puglia">Puglia</option>
                  <option value="sardegna">Sardegna</option>
                  <option value="sicilia">Sicilia</option>
                  <option value="toscana">Toscana</option>
                  <option value="trentino-alto-adige">Trentino-Alto Adige</option>
                  <option value="umbria">Umbria</option>
                  <option value="valle-d-aosta">Valle d'Aosta</option>
                  <option value="veneto">Veneto</option>
                </Form.Select>
              </Col>
            </Row>
            <Row>
              <Col>Superficie calpestabile</Col>
            </Row>
            <Row>
              <Col>
                <InputGroup className="inputInsulation" style={{ maxWidth: "120px" }}>
                  <Form.Control type="number" min="0" />
                  <InputGroup.Text id="basic-addon2">m&sup2;</InputGroup.Text>
                </InputGroup>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>Spesa media elettricità</Col>
          <Col>
            <Form.Range className="sliderAreaBuilding" min={15} max={500} step={5} />
            <p> €/mese</p>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center mt-4">
          <Button className="btnEvaluation" onClick={handleStartEvaluation}>
            CALCOLA
          </Button>
        </Row>
      </Container>
    </>
  );
};

export default Photovoltaic;
