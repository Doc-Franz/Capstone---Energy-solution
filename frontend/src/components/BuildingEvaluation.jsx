import { Button, Card, Col, Container, Form, InputGroup, ListGroup, Row } from "react-bootstrap";
import villetta from "../assets/images/edificio/villetta.svg";
import appPianoTerra from "../assets/images/edificio/appartamento_pianoterra.svg";
import appIntermedio from "../assets/images/edificio/appartamento_pianointermedio.svg";
import capannone from "../assets/images/edificio/capannone.svg";
import geotermico from "../assets/images/impianto/geotermico.svg";
import pdc from "../assets/images/impianto/pdc.svg";
import caldaiaTradizionale from "../assets/images/impianto/caldaiatradizionale.svg";
import caldaiaCondensazione from "../assets/images/impianto/caldaiacondensazione.svg";
import north from "../assets/images/orientamento/north.svg";
import south from "../assets/images/orientamento/south.svg";
import west from "../assets/images/orientamento/west.svg";
import east from "../assets/images/orientamento/east.svg";
import wall from "../assets/images/muratura/wall.svg";
import airFilter from "../assets/images/muratura/air-filter.svg";
import concrete from "../assets/images/muratura/concrete.svg";
import mobileHouse from "../assets/images/muratura/mobile-house.svg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BuildingEvaluation = () => {
  // al cambio di pagina lo stato del componente viene resettato
  const [startEvaluation, setStartEvaluation] = useState(false);

  // variabile che controlla il numero della domanda
  let [questionNumber, setQuestionNumber] = useState(0);

  // variabile che controlla se è la prima domanda
  const [isFirstQuestion, setIsFirstQuestion] = useState(true);

  // variabile che controlla se è la seconda domanda
  const [isSecondQuestion, setIsSecondQuestion] = useState(false);

  // variabile che controlla se è già arrivata la domanda sull'isolamento
  const [isThermalInsulation, setIsThermalInsulation] = useState(false);

  // variabile che controlla il valore dello slider per la superficie
  const [sliderValue, setSliderValue] = useState(50);

  // variabile che controlla il checkbox sull'isolamento
  const [isChecked, setIsChecked] = useState(false);

  // metodo che controlla la variazione dello slider
  const handleSliderChange = (e) => {
    setSliderValue(e.target.value);
  };

  const handleStartEvaluation = () => {
    setStartEvaluation(true);
  };

  // metodo che controlla la prima domanda
  const handleFirstQuestion = () => {
    setTimeout(() => {
      setIsFirstQuestion(false);
      setIsSecondQuestion(true);
    }, 300);
  };

  // metodo che controlla la seconda domanda
  const handleSecondQuestion = () => {
    setTimeout(() => {
      setIsSecondQuestion(false);
    }, 300);
  };

  useEffect(() => {
    // quando arrivo alla penultima domanda deve inserirsi la domanda sull'isolamento
    if (questionNumber == questionsAndAnswers.question.length - 1) {
      setIsThermalInsulation(true);
    }
  }, [questionNumber]);

  const handleThermalInsulationQuestion = () => {
    setTimeout(() => {
      setIsThermalInsulation(false);
    }, 300);
  };

  // al click sulla risposta si passa alla domanda successiva, con un leggero lag di 3000 ms
  const handleClick = () => {
    setTimeout(() => {
      setQuestionNumber((questionNumber += 1));
    }, 300);
  };

  // metodo che controlla il checkbox sull'isolamento termico
  const handleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  //  oggeto che contiente le domande e le risposte per fare la valutazione del carico termico
  const questionsAndAnswers = {
    question: [
      "Che tipologia di edificio intendi climatizzare?",
      "Qual è l'esposizione della facciata principale?",
      "Indicaci la tipologia della muratura",
      "Che impianto intendi installare?"
    ],
    firstAnswer: [
      {
        icon: villetta,
        textContent: "Villetta"
      },
      {
        icon: north,
        textContent: "NORD"
      },
      {
        icon: wall,
        textContent: "Mattoni pieni"
      },
      {
        icon: geotermico,
        textContent: "Sistema geotermico"
      }
    ],
    secondAnswer: [
      {
        icon: appPianoTerra,
        textContent: "Appartamento piano terra"
      },
      {
        icon: south,
        textContent: "SUD"
      },
      {
        icon: airFilter,
        textContent: "Mattoni con intercapedine d'aria"
      },
      {
        icon: pdc,
        textContent: "Pompa di calore"
      }
    ],
    thirdAnswer: [
      {
        icon: appIntermedio,
        textContent: "Appartemento piano intermedio"
      },
      {
        icon: west,
        textContent: "OVEST"
      },
      {
        icon: concrete,
        textContent: "Calcestruzzo"
      },
      {
        icon: caldaiaCondensazione,
        textContent: "Caldaia a condensazione"
      }
    ],
    fourthAnswer: [
      {
        icon: capannone,
        textContent: "Capannone industriale"
      },
      {
        icon: east,
        textContent: "EST"
      },
      {
        icon: mobileHouse,
        textContent: "Prefabbricato"
      },
      {
        icon: caldaiaTradizionale,
        textContent: "Caldaia tradizionale"
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
      ) : // se è la prima domanda mostrami la superfice altrimenti mostrami la seconda domanda e poi le card
      isFirstQuestion ? (
        <>
          {/* ❗❗❗DA STILIZZARE */}
          <Row className="fs-5 fw-bold d-flex justify-content-center text-center mt-4 mb-4">Indicaci la superficie dell'edificio</Row>
          <Row className="d-flex flex-column align-items-center">
            <Col md={8}>
              <Form.Range className="sliderAreaBuilding" min={15} max={500} step={5} value={sliderValue} onChange={handleSliderChange} />
              <p>{sliderValue} m&sup2;</p>
            </Col>
            <Col className="text-center">
              <Button className="navigationBtn" onClick={handleFirstQuestion}>
                AVANTI
              </Button>
            </Col>
          </Row>
        </>
      ) : isSecondQuestion ? (
        <>
          <Row className="fs-5 fw-bold d-flex justify-content-center text-center mt-4 mb-4">Da quale regione provieni?</Row>
          <Row className="d-flex flex-column align-items-center">
            <Col className="col-6 text-center" sm={5} lg={3}>
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

            <Col className="text-center">
              <Button className="navigationBtn" onClick={handleSecondQuestion}>
                AVANTI
              </Button>
            </Col>
          </Row>
        </>
      ) : isThermalInsulation ? (
        <>
          <Row className="fs-5 fw-bold d-flex justify-content-center text-center mt-4 mb-4">L'edificio è isolato? </Row>
          <Row className="d-flex flex-column">
            <Col>
              <Form.Check
                className="mb-3"
                type="switch"
                id="checkboxInsulation"
                label="Indicare se è presente l'isolamento"
                checked={isChecked}
                onChange={handleCheckbox}
              />
            </Col>

            {isChecked ? (
              <Row className="d-flex align-items-center justify-content-start mb-3">
                <Col className="col-6" md={4} xl={3}>
                  Spessore dell'isolamento
                </Col>
                <Col>
                  <InputGroup className="inputInsulation" style={{ maxWidth: "120px" }}>
                    <Form.Control type="number" />
                    <InputGroup.Text id="basic-addon2">cm</InputGroup.Text>
                  </InputGroup>
                </Col>
              </Row>
            ) : null}
            <Col className="text-center">
              <Button className="navigationBtn" onClick={handleThermalInsulationQuestion}>
                AVANTI
              </Button>
            </Col>
          </Row>
        </>
      ) : (
        <>
          {" "}
          <Row className="fs-5 fw-bold d-flex justify-content-center text-center mt-4 mb-4">{questionsAndAnswers.question[questionNumber]}</Row>
          {/* indicazioni per poter calcolare il carico termico  */}
          <Row className="d-flex flex-wrap">
            {questionNumber == questionsAndAnswers.question.length - 1 ? (
              <>
                <Col sm={6} md={3} className="col-6 d-flex flex-stretch mt-2 justify-content-center">
                  <Link to="/preventiveProducts" className="text-decoration-none d-flex align-items-center">
                    <Card className="cardSelection" onClick={handleClick} style={{ cursor: "pointer" }}>
                      <Card.Img className="my-3 px-2" variant="top" src={questionsAndAnswers.firstAnswer[questionNumber].icon} />
                      <Card.Text className="text-center mb-3 mx-2">{questionsAndAnswers.firstAnswer[questionNumber].textContent}</Card.Text>
                    </Card>
                  </Link>
                </Col>

                <Col sm={6} md={3} className="col-6 d-flex flex-stretch mt-2 justify-content-center">
                  <Link to="/preventiveProducts" className="text-decoration-none d-flex align-items-center">
                    <Card className="cardSelection" onClick={handleClick} style={{ cursor: "pointer" }}>
                      <Card.Img className="my-3 px-2" variant="top" src={questionsAndAnswers.secondAnswer[questionNumber].icon} />
                      <Card.Text className="text-center mb-3 mx-2">{questionsAndAnswers.secondAnswer[questionNumber].textContent}</Card.Text>
                    </Card>
                  </Link>
                </Col>

                <Col sm={6} md={3} className="col-6 d-flex flex-stretch mt-2 justify-content-center">
                  <Link to="/preventiveProducts" className="text-decoration-none d-flex align-items-center">
                    <Card className="cardSelection" onClick={handleClick} style={{ cursor: "pointer" }}>
                      <Card.Img className="my-3 px-2" variant="top" src={questionsAndAnswers.thirdAnswer[questionNumber].icon} />
                      <Card.Text className="text-center mb-3 mx-2">{questionsAndAnswers.thirdAnswer[questionNumber].textContent}</Card.Text>
                    </Card>
                  </Link>
                </Col>

                <Col sm={6} md={3} className="col-6 d-flex flex-stretch mt-2 justify-content-center">
                  <Link to="/preventiveProducts" className="text-decoration-none d-flex align-items-center">
                    <Card className="cardSelection" onClick={handleClick} style={{ cursor: "pointer" }}>
                      <Card.Img className="my-3 px-2" variant="top" src={questionsAndAnswers.fourthAnswer[questionNumber].icon} />
                      <Card.Text className="text-center mb-3 mx-2">{questionsAndAnswers.fourthAnswer[questionNumber].textContent}</Card.Text>
                    </Card>
                  </Link>
                </Col>
              </>
            ) : (
              <>
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
              </>
            )}
          </Row>{" "}
        </>
      )}
    </Container>
  );
};

export default BuildingEvaluation;
