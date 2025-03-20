import Hero from "./Hero";
import MyNavbar from "./MyNavbar";
import img1 from "../assets/images/informazioni/img1.jpeg";
import img2 from "../assets/images/informazioni/img2.jpeg";
import img3 from "../assets/images/informazioni/img3.jpeg";
import img4 from "../assets/images/informazioni/img4.jpeg";
import img5 from "../assets/images/informazioni/img5.jpeg";
import incentivi from "../assets/images/informazioni/incentivifiscali.jpeg";
import r32 from "../assets/images/informazioni/r32.jpeg";
import installazione from "../assets/images/informazioni/installazione.jpeg";
import efficienza from "../assets/images/informazioni/efficienza.jpeg";
import silenzio from "../assets/images/informazioni/silenzio.jpeg";
import fotovoltaico from "../assets/images/informazioni/fotovoltaico.jpeg";
import { ChevronRight } from "react-bootstrap-icons";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";

const Information = () => {
  const carouselArray = [img1, img2, img3, img4, img5];
  const cardInfo = "Informazioni utili";

  return (
    <>
      <MyNavbar informationSelected={true} />
      <Hero carouselImage={carouselArray} cardTitle={cardInfo} />
      <Container className="information">
        <Row className="fs-1 fw-bold d-flex justify-content-center text-center mt-4">Chi siamo?</Row>
        <Row className="lead fs-6 d-flex justify-content-start">
          <Col className="d-flex justify-content-center">
            La nostra azienda opera da anni nel settore della climatizzazione, offrendo soluzioni efficienti e innovative. Siamo costantemente aggiornati sulle
            ultime tecnologie per garantire comfort e risparmio energetico ai nostri clienti.
          </Col>
        </Row>
        <Row className="mt-4 d-flex justify-content-between">
          <Col className="col-12 mb-4 d-flex stretch" md={5} lg={4}>
            <Card className="shadow">
              <Card.Img fluid variant="top" src={incentivi} />
              <Card.Body>
                <Card.Title>
                  <a
                    href="https://www.ipsoa.it/wkpedia/bonus-risparmio-energetico#:~:text=L'agevolazione%20fiscale%20per%20la,dalla%20legge%20di%20bilancio%202021."
                    target="_blank"
                    className="w-100 d-block"
                  >
                    {" "}
                    <Button className="informationLink fs-5 text-dark bg-transparent border-0 rounded-0 px-0 text-start">
                      Incentivi fiscali
                      <ChevronRight className="ms-2" />
                    </Button>
                  </a>
                </Card.Title>
                <Card.Text className="fs-6 lead mb-2">
                  Tutto quello che devi sapere per avere accesso agli incentivi per l'intervento di risparmio energetico
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col className="col-12 mb-4 d-flex stretch" md={5} lg={4}>
            <Card className="shadow">
              <Card.Img fluid variant="top" src={r32} />
              <Card.Body>
                <Card.Title>
                  <a
                    href="https://www.latermotecnica.net/gas-refrigerante-r-tutto-quello-che-23748#:~:text=Quando%20sar%C3%A0%20obbligatorio%20utilizzare%20il,refrigerante%20inferiore%20ai%203%20kg."
                    target="_blank"
                    className="w-100 d-block"
                  >
                    {" "}
                    <Button className="informationLink fs-5 text-dark bg-transparent border-0 rounded-0 px-0 text-start">
                      Gas refrigerante R32
                      <ChevronRight className="ms-2" />
                    </Button>
                  </a>
                </Card.Title>
                <Card.Text className="fs-6 lead mb-2">Come effettuare tutte le verifiche secondo normativa</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col className="col-12 mb-4 d-flex stretch" md={5} lg={4}>
            <Card className="shadow">
              <Card.Img fluid variant="top" src={installazione} />
              <Card.Body>
                <Card.Title>
                  <a
                    href="https://www.tavolla.com/magazine/pompa-di-calore-dove-installarla/#:~:text=Una%20pompa%20di%20calore%20aria%20%E2%80%93%20aria%20va%20posizionata%20in%20un,in%20un%20locale%20non%20umido."
                    target="_blank"
                    className="w-100 d-block"
                  >
                    {" "}
                    <Button className="informationLink fs-5 text-dark bg-transparent border-0 rounded-0 px-0 text-start">
                      Dove installare la macchina
                      <ChevronRight className="ms-2" />
                    </Button>
                  </a>
                </Card.Title>
                <Card.Text className="fs-6 lead mb-2">Guida passo passo per poter installare la macchina esterna nel luogo più indicato e favorevole</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col className="col-12 mb-4 d-flex stretch" md={5} lg={4}>
            <Card className="shadow">
              <Card.Img fluid variant="top" src={efficienza} />
              <Card.Body>
                <Card.Title>
                  <a
                    href="https://www.teon.it/pompa-di-calore-vs-condensazione-confronto/#:~:text=La%20pompa%20di%20calore%20rappresenta,ad%20una%20caldaia%20a%20gasolio."
                    target="_blank"
                    className="w-100 d-block"
                  >
                    {" "}
                    <Button className="informationLink fs-5 text-dark bg-transparent border-0 rounded-0 px-0 text-start">
                      Efficienza e resa delle macchine
                      <ChevronRight className="ms-2" />
                    </Button>
                  </a>
                </Card.Title>
                <Card.Text className="fs-6 lead mb-2">Come cambiano i coefficienti di prestazione e il recupero termico in base alle temperature?</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col className="col-12 mb-4 d-flex stretch" md={5} lg={4}>
            <Card className="shadow">
              <Card.Img fluid variant="top" src={silenzio} />
              <Card.Body>
                <Card.Title>
                  <a href="https://innovasol.it/rumore-pompe-di-calore/" target="_blank" className="w-100 d-block">
                    {" "}
                    <Button className="informationLink fs-5 text-dark bg-transparent border-0 rounded-0 px-0 text-start">
                      Rumorosità delle macchine
                      <ChevronRight className="ms-2" />
                    </Button>
                  </a>
                </Card.Title>
                <Card.Text className="fs-6 lead mb-2">Scopri la silenziosità dei nostri sistemi, garanzia di comfort acustico e climatico</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col className="col-12 mb-4 d-flex stretch" md={5} lg={4}>
            <Card className="shadow">
              <Card.Img fluid variant="top" src={fotovoltaico} />
              <Card.Body>
                <Card.Title>
                  <a
                    href="https://www.ingenio-web.it/articoli/l-integrazione-della-pompa-di-calore-con-l-impianto-fotovoltaico-funzionamento-e-vantaggi/"
                    target="_blank"
                    className="w-100 d-block"
                  >
                    {" "}
                    <Button className="informationLink fs-5 text-dark bg-transparent border-0 rounded-0 px-0 text-start">
                      Riscaldamento e pannelli solari
                      <ChevronRight className="ms-2" />
                    </Button>
                  </a>
                </Card.Title>
                <Card.Text className="fs-6 lead mb-2">
                  Scopri come collegare i nostri sistemi di climatizzazione a un impianto fotovoltaico, per una migliore efficienza
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Information;
