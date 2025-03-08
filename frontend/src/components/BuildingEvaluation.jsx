import { Button, Card, Col, Container, Form, ListGroup, Row } from "react-bootstrap";
import villetta from "../assets/images/edificio/villetta.svg";
import appPianoTerra from "../assets/images/edificio/appartamento_pianoterra.svg";
import appIntermedio from "../assets/images/edificio/appartamento_pianointermedio.svg";
import capannone from "../assets/images/edificio/capannone.svg";
import geotermico from "../assets/images/impianto/geotermico.svg";
import pdc from "../assets/images/impianto/pdc.svg";
import caldaiaTradizionale from "../assets/images/impianto/caldaiatradizionale.svg";
import caldaiaCondensazione from "../assets/images/impianto/caldaiacondensazione.svg";
import { useState } from "react";

const BuildingEvaluation = () => {
  // al cambio di pagina lo stato del componente viene resettato
  const [startEvaluation, setStartEvaluation] = useState(false);

  // variabile che controlla il numero della domanda
  let [questionNumber, setQuestionNumber] = useState(0);

  // variabile che controlla se è la prima domanda
  const [isFirstQuestion, setIsFirstQuestion] = useState(true);

  // variabile che controlla il valore dello slider per la superficie
  const [sliderValue, setSliderValue] = useState(50);

  // metodo che controlla la variazione dello slider
  const handleSliderChange = (e) => {
    setSliderValue(e.target.value);
  };

  const handleStartEvaluation = () => {
    setStartEvaluation(true);
  };

  const handleFirstQuestion = () => {
    setTimeout(() => {
      setIsFirstQuestion(false);
    }, 300);
  };

  // al click sulla risposta si passa alla domanda successiva, con un leggero lag di 3000 ms
  const handleClick = () => {
    setTimeout(() => {
      setQuestionNumber((questionNumber += 1));
    }, 300);
  };

  //  oggeto che contiente le domande e le risposte per fare la valutazione del carico termico
  const questionsAndAnswers = {
    question: ["Che impianto intendi installare", "Che tipologia di edificio intendi climatizzare?"],
    firstAnswer: [
      {
        icon: geotermico,
        textContent: "Sistema geotermico"
      },
      {
        icon: villetta,
        textContent: "Villetta"
      }
    ],
    secondAnswer: [
      {
        icon: pdc,
        textContent: "Pompa di calore"
      },
      {
        icon: appPianoTerra,
        textContent: "Appartamento piano terra"
      }
    ],
    thirdAnswer: [
      {
        icon: caldaiaCondensazione,
        textContent: "Caldaia a condensazione"
      },
      {
        icon: appIntermedio,
        textContent: "Appartemento piano intermedio"
      }
    ],
    fourthAnswer: [
      {
        icon: caldaiaTradizionale,
        textContent: "Caldaia tradizionale"
      },
      {
        icon: capannone,
        textContent: "Capannone industriale"
      }
    ]
  };

  return (
    <Container className="buildingEvaluation">
      <Row className="fs-1 fw-bold d-flex justify-content-center text-center mt-4">Hai bisogno di aiuto?</Row>
      <Row className="fs-1 fw-bold d-flex justify-content-center text-center mb-2">Ci pensiamo noi!</Row>
      <Row className="lead fs-6 d-flex justify-content-start">
        <Col className="d-flex justify-content-center">
          Rispondendo a poche semplici domande ti guideremo nella selezione del prodotto più adatto per il tuo edificio
        </Col>
      </Row>

      {!startEvaluation ? (
        <Row className="d-flex justify-content-center mt-4">
          <Button className="btnEvaluation" onClick={handleStartEvaluation}>
            INIZIA SUBITO
          </Button>
        </Row>
      ) : // se è la prima domanda mostrami la superfice altrimenti mostrami le card
      isFirstQuestion ? (
        <>
          {/* ❗❗❗DA STILIZZARE */}
          <Row className="fs-5 fw-bold d-flex justify-content-center text-center mt-4 mb-4">Indicaci la superficie dell'edificio</Row>
          <Row>
            <Form.Range className="sliderAreaBuilding" min={15} max={500} step={5} value={sliderValue} onChange={handleSliderChange} />
            <p>{sliderValue} m&sup2;</p>
            <Button onClick={handleFirstQuestion}>AVANTI</Button>
          </Row>
        </>
      ) : (
        <>
          {" "}
          <Row className="fs-5 fw-bold d-flex justify-content-center text-center mt-4 mb-4">{questionsAndAnswers.question[questionNumber]}</Row>
          {/* indicazioni per poter calcolare il carico termico  */}
          <Row className="d-flex flex-wrap">
            <Col sm={6} md={3} className="col-6 d-flex flex-stretch mt-2 justify-content-center">
              <Card className="cardSelection" onClick={handleClick} style={{ cursor: "pointer" }}>
                <Card.Img className="my-3 px-2" variant="top" src={questionsAndAnswers.firstAnswer[questionNumber].icon} />
                <Card.Text className="text-center mb-3 mx-2">{questionsAndAnswers.firstAnswer[questionNumber].textContent}</Card.Text>
              </Card>
            </Col>
            <Col sm={6} md={3} className="col-6 d-flex flex-stretch mt-2 justify-content-center">
              <Card className="cardSelection" onClick={handleClick} style={{ cursor: "pointer" }}>
                <Card.Img className="my-3 px-2" variant="top" src={questionsAndAnswers.secondAnswer[questionNumber].icon} />
                <Card.Text className="text-center mb-3 mx-2">{questionsAndAnswers.secondAnswer[questionNumber].textContent}</Card.Text>
              </Card>
            </Col>
            <Col sm={6} md={3} className="col-6 d-flex flex-stretch mt-2 justify-content-center">
              <Card className="cardSelection" onClick={handleClick} style={{ cursor: "pointer" }}>
                <Card.Img className="my-3 px-2" variant="top" src={questionsAndAnswers.thirdAnswer[questionNumber].icon} />
                <Card.Text className="text-center mb-3 mx-2">{questionsAndAnswers.thirdAnswer[questionNumber].textContent}</Card.Text>
              </Card>
            </Col>
            <Col sm={6} md={3} className="col-6 d-flex flex-stretch mt-2 justify-content-center">
              <Card className="cardSelection" onClick={handleClick} style={{ cursor: "pointer" }}>
                <Card.Img className="my-3 px-2" variant="top" src={questionsAndAnswers.fourthAnswer[questionNumber].icon} />
                <Card.Text className="text-center mb-3 mx-2">{questionsAndAnswers.fourthAnswer[questionNumber].textContent}</Card.Text>
              </Card>
            </Col>
          </Row>{" "}
        </>
      )}
    </Container>
  );
};

export default BuildingEvaluation;
