import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import villetta from "../assets/images/edificio/villetta.svg";
import appPianoTerra from "../assets/images/edificio/appartamento_pianoterra.svg";
import appIntermedio from "../assets/images/edificio/appartamento_pianointermedio.svg";
import capannone from "../assets/images/edificio/capannone.svg";

const BuildingEvaluation = () => {
  const handleClick = () => {
    console.log("ciao");
  };

  return (
    <Container>
      <Row className="fs-1 fw-bold d-flex justify-content-center text-center mt-4">Hai bisogno di aiuto?</Row>
      <Row className="fs-1 fw-bold d-flex justify-content-center text-center mb-2">Ti aiutiamo noi!</Row>
      <Row className="lead fs-6 d-flex justify-content-center">
        <Col className="d-flex justify-content-start">
          Rispondendo a poche semplici domande ti guideremo nella selezione del prodotto più adatto per il tuo edificio
        </Col>
      </Row>
      <Row className="d-flex justify-content-center mt-4">
        <Button className="btnEvaluation">INIZIA SUBITO</Button>
      </Row>
      <Row className="fs-5 fw-bold d-flex justify-content-center text-center mb-2">Che tipologia di edificio intendi climatizzare?</Row>

      {/* indicazioni per poter calcolare il carico termico */}
      <Row className="d-flex flex-wrap">
        <Col xs={12} sm={6} md={3} className="d-flex flex-stretch mt-2 justify-content-center">
          <Card className="cardSelection" onClick={handleClick} style={{ cursor: "pointer" }}>
            <Card.Img className="my-3 px-2" variant="top" src={villetta} />
            <Card.Text className="text-center mb-3 mx-2">Villetta</Card.Text>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={3} className="d-flex flex-stretch mt-2 justify-content-center">
          <Card className="cardSelection" onClick={handleClick} style={{ cursor: "pointer" }}>
            <Card.Img className="my-3 px-2" variant="top" src={appPianoTerra} />
            <Card.Text className="text-center mb-3 mx-2">Appartamento piano terra</Card.Text>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={3} className="d-flex flex-stretch mt-2 justify-content-center">
          <Card className="cardSelection" onClick={handleClick} style={{ cursor: "pointer" }}>
            <Card.Img className="my-3 px-2" variant="top" src={appIntermedio} />
            <Card.Text className="text-center mb-3 mx-2">Appartemento piano intermedio</Card.Text>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={3} className="d-flex flex-stretch mt-2 justify-content-center">
          <Card className="cardSelection" onClick={handleClick} style={{ cursor: "pointer" }}>
            <Card.Img className="my-3 px-2" variant="top" src={capannone} />
            <Card.Text className="text-center mb-3 mx-2">Capannone industriale</Card.Text>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BuildingEvaluation;
