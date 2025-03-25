import Hero from "./Hero";
import MyNavbar from "./MyNavbar";
import img1 from "../assets/images/fotovoltaico/img1.jpeg";
import img2 from "../assets/images/fotovoltaico/img2.jpeg";
import img3 from "../assets/images/fotovoltaico/img3.jpeg";
import img4 from "../assets/images/fotovoltaico/img4.jpeg";
import img5 from "../assets/images/fotovoltaico/img5.jpeg";
import solarEnergy from "../assets/images/fotovoltaico/solarenergy.svg";
import piano from "../assets/images/tetto/piano.svg";
import falde from "../assets/images/tetto/falde.svg";
import { Button, Card, Col, Container, Form, Image, InputGroup, Modal, Row } from "react-bootstrap";
import { useEffect, useState } from "react";

const Photovoltaic = () => {
  const carouselArray = [img1, img2, img3, img4, img5];
  const cardInfo = "Fotovoltaico";

  // oggetto che contiene tutte le risposte inserite nel form
  const [photovoltaicAnswers, setPhotovoltaicAnswers] = useState({
    firstAnswer: null,
    secondAnswer: null,
    thirdAnswer: null,
    fourthAnswer: null
  });

  // al cambio di pagina lo stato del componente viene resettato
  const [startEvaluation, setStartEvaluation] = useState(false);

  // metodo che controlla l'area
  const handleArea = (e) => {
    const area = e.target.value;
    setPhotovoltaicAnswers((prevPhotovoltaicAnswers) => ({ ...prevPhotovoltaicAnswers, thirdAnswer: area }));
  };

  // stato che controlla il valore dello slider per la spesa media delle bollette
  const [sliderValue, setSliderValue] = useState(25);

  // stati che controllano quale card è selezionata
  const [firstCardSelected, setFirstCardSelected] = useState(false);
  const [secondCardSelected, setSecondCardSelected] = useState(false);

  // metodo che controlla l'onclick su una delle card
  const handleFirstCardClick = () => {
    setFirstCardSelected(!firstCardSelected);
    setSecondCardSelected(false);

    setPhotovoltaicAnswers((prevPhotovoltaicAnswers) => ({ ...prevPhotovoltaicAnswers, firstAnswer: "1" }));
  };
  const handleSecondCardClick = () => {
    setSecondCardSelected(!secondCardSelected);
    setFirstCardSelected(false);

    setPhotovoltaicAnswers((prevPhotovoltaicAnswers) => ({ ...prevPhotovoltaicAnswers, firstAnswer: "2" }));
  };

  // metodo che controlla la selezione della regione
  const handleFormSelection = (e) => {
    setPhotovoltaicAnswers((prevPhotovoltaicAnswers) => ({ ...prevPhotovoltaicAnswers, secondAnswer: e.target.value }));
  };

  // metodo che controlla la variazione dello slider
  const handleSliderChange = (e) => {
    const slider = e.target.value;
    setPhotovoltaicAnswers((prevPhotovoltaicAnswers) => ({ ...prevPhotovoltaicAnswers, fourthAnswer: slider }));
    setSliderValue(e.target.value);
  };

  const handleStartEvaluation = () => {
    setStartEvaluation(true);
  };

  // stato che controlla se abilitare o meno il bottone di calcolo
  const [formCompleted, setFormCompleted] = useState(false);

  // il bottone di calcolo si abilita solamente quando sono stati inseriti tutti i parametri dall'utente
  useEffect(() => {
    if (Object.values(photovoltaicAnswers).every((answer) => answer != null)) {
      setFormCompleted(true);
    }
  }, [photovoltaicAnswers]);

  // gestione del modale
  const [modalShow, setModalShow] = useState(false);

  const handleModal = () => {
    setModalShow(true);
  };

  const handleCloseModal = () => {
    setModalShow(false);
  };

  // metodo che calcola il risparmio in bolletta con i dati inseriti dlal'utente
  const handlePhotovoltaicEvaluation = () => {
    // si ipotizza che un pannello fotovoltaico abbia un'area di 2 m2 e una potenza di 440 Wp
    // per ogni kW installato si ha una producibilità che va dai 1000 ai 1300 kWh/kW*y, in base alla posizione geografica
    // il costo dell'elettricità si ipotizza a 0,17 €/kWh
    // l'impianto massimo installabile è di 20 kWp

    // potenza di un singolo pannello
    const powerPanel = 0.4; // [kWp]
    // costo dell'energia elettrica [€/kWh]
    const electricEnergyPrice = 0.17;
    // si ipotizza che si riesca ad usare il 30% dell'energia elettrica prodotta -> non si hanno batterie di accumulo
    const electricEnergyUsed = 0.3;

    // calcolo della producibilità in funzione della località geografica
    let plantProducibility;
    // salvo la regione selezionata
    const region = photovoltaicAnswers.secondAnswer;

    switch (region) {
      case "sicilia":
      case "sardegna":
        plantProducibility = 1300;
        break;
      case "campania":
      case "puglia":
      case "calabria":
      case "basilicata":
        plantProducibility = 1200;
        break;
      case "lazio":
      case "liguria":
      case "toscana":
      case "emilia-romagna":
      case "abruzzo":
      case "molise":
      case "umbria":
      case "marche":
        plantProducibility = 1100;
        break;
      case "piemonte":
      case "valle d'aosta":
      case "lombardia":
      case "trentino-alto adige":
      case "veneto":
      case "friuli venezia giulia":
        plantProducibility = 1000;
        break;
      default:
        plantProducibility = 1000;
        break;
    }

    // calcolo del numero di pannelli installabili in base alla superficie
    let numberOfPanels;
    if (photovoltaicAnswers.firstAnswer == "1") {
      numberOfPanels = parseInt((parseInt(photovoltaicAnswers.thirdAnswer) / 2) * 0.6); // ipotizzo di non occupare tutto lo spazio disponibile
      if (numberOfPanels > 50) {
        numberOfPanels = 50;
      }
    } else {
      numberOfPanels = parseInt((parseInt(photovoltaicAnswers.thirdAnswer) / 4) * 0.6); // se il tetto è a falde posso installare solamente su una falda
      if (numberOfPanels > 50) {
        numberOfPanels = 50;
      }
    }

    // calcolo la massima potenza teoricamente installabile
    const powerPlant = numberOfPanels * powerPanel; // [kWp] -> potenza in Watt picco

    // calcolo l'energia elettrica [kWh] dal fotovoltaico per anno
    const energyProducedByPhotovoltaic = powerPlant * plantProducibility * electricEnergyUsed;

    // calcolo della bolletta pagata
    const userBill = parseInt(photovoltaicAnswers.fourthAnswer) * 12;

    // calcolo il risparmio in bolletta -> [kWh] * [€/kWh] = [€]
    let billSaving = parseInt(energyProducedByPhotovoltaic * electricEnergyPrice);

    // se tutta l'energia prodotta viene utilizzata dall'utente il risparmio in bolletta viene impostato al 90 % della somma delle bollette annuali
    if (billSaving > userBill) {
      billSaving = parseInt(userBill * 0.9);
    }

    console.log("numero pannelli " + numberOfPanels);
    console.log("risparmio € " + billSaving);
    console.log("Energia fotovoltaico kWh " + energyProducedByPhotovoltaic);

    return [numberOfPanels, powerPlant, billSaving];
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
        ) : (
          <>
            <Row className="mt-4 d-flex flex-column text-center">
              <Col className="col-12 mb-4">
                <Row>
                  <Col className="text-start fs-5 fw-bold">Tipologia tetto</Col>
                </Row>
                <Row>
                  <Col className="mt-2 d-flex justify-content-center">
                    <Card
                      className="cardSelection"
                      onClick={handleFirstCardClick}
                      style={{ cursor: "pointer", backgroundColor: firstCardSelected ? "#c4d2e2" : "white", color: firstCardSelected ? "#568fcf" : "black" }}
                    >
                      <Card.Img className="my-3 px-2" variant="top" src={piano} />
                      <Card.Text className="text-center mb-3 mx-2">Tetto piano</Card.Text>
                    </Card>
                  </Col>
                  <Col className="mt-2 d-flex justify-content-center">
                    <Card
                      className="cardSelection"
                      onClick={handleSecondCardClick}
                      style={{ cursor: "pointer", backgroundColor: secondCardSelected ? "#c4d2e2" : "white", color: secondCardSelected ? "#568fcf" : "black" }}
                    >
                      <Card.Img className="my-3 px-2" variant="top" src={falde} />
                      <Card.Text className="text-center mb-3 mx-2">Tetto a falde</Card.Text>
                    </Card>
                  </Col>
                </Row>
              </Col>
              <Col>
                <Row>
                  <Col className="mb-2 text-start fs-5 fw-bold">Regione di provenienza</Col>
                </Row>
                <Row className="d-flex justify-content-center">
                  <Col className="col-6" sm={5} lg={3}>
                    <Form.Select className="formRegion mb-3" htmlSize={3} onClick={handleFormSelection}>
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
                <Row className="mt-2">
                  <Col className="mb-2 text-start fs-5 fw-bold">Superficie calpestabile</Col>
                </Row>
                <Row>
                  <Col className="d-flex justify-content-center">
                    <InputGroup className="inputInsulation" style={{ maxWidth: "120px" }}>
                      <Form.Control type="number" min="0" onChange={handleArea} />
                      <InputGroup.Text id="basic-addon2">m&sup2;</InputGroup.Text>
                    </InputGroup>
                  </Col>
                </Row>
                <Row className="d-flex flex-column mt-4">
                  <Col className="text-start fs-5 fw-bold">Spesa media elettricità</Col>
                  <Col>
                    <Form.Range className="sliderAreaBuilding" min={5} max={200} step={5} value={sliderValue} onChange={handleSliderChange} />
                    <p>{sliderValue} €/mese</p>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row className="d-flex justify-content-center mt-4">
              <Button className="photovoltaicEvaluation" onClick={handleModal} disabled={!formCompleted}>
                CALCOLA
              </Button>
            </Row>
          </>
        )}

        <Modal show={modalShow} size="md" centered>
          <Modal.Header closeButton onClick={handleCloseModal}>
            <Modal.Title id="contained-modal-title-vcenter">Ti suggeriamo...</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="d-flex justify-content-center">
              <Col className="col-8 mb-3" xl={6}>
                <Image fluid src={solarEnergy} />
              </Col>
              <Col className="col-12" xl={6}>
                <Row className="mb-2 d-flex align-items-end">
                  <Col className="text-secondary-emphasis col-8" xl={6}>
                    Potenza pannello:
                  </Col>
                  <Col className="fw-semibold">400 Wp</Col>
                </Row>
                <Row className="mb-2 d-flex align-items-end">
                  <Col className="text-secondary-emphasis col-8" xl={6}>
                    Numero pannelli:
                  </Col>
                  <Col className="fw-semibold">{handlePhotovoltaicEvaluation()[0]}</Col>
                </Row>
                <Row className="mb-2 d-flex align-items-end">
                  <Col className="text-secondary-emphasis col-8" xl={6}>
                    Potenza impianto:
                  </Col>
                  <Col className="fw-semibold">{parseFloat(handlePhotovoltaicEvaluation()[1].toFixed(1))} kWp</Col>
                </Row>
                <Row className="mb-2 d-flex align-items-end" style={{ backgroundColor: "rgb(27, 224, 27, 0.1)", border: "1px solid #1BE01B" }}>
                  <Col className="text-secondary-emphasis col-8" xl={6}>
                    Risparmio annuo:
                  </Col>
                  <Col className="fw-semibold">{handlePhotovoltaicEvaluation()[2]} €</Col>
                </Row>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button className="photovoltaicEvaluation" style={{ width: "100px" }} onClick={handleCloseModal}>
              Chiudi
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default Photovoltaic;
