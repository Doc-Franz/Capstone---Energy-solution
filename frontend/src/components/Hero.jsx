import { Badge, Button, Card, Col, Container, Image, ListGroup, Row } from "react-bootstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { CheckLg } from "react-bootstrap-icons";

const Hero = (props) => {
  const settings = {
    infinite: true,
    slidesToScroll: 1, // valore predefinito
    slidesToShow: 2, // valore predefinito
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 992, // fino a 992px vengono mostrate 2 slides
        settings: {
          slidesToShow: 2
        }
      }
    ]
  };

  return (
    <Container fluid className="hero" style={{ marginTop: "100px", paddingTop: "100px", position: "relative" }}>
      <Row className="slider-container">
        <Slider className="gx-0" {...settings}>
          {props.carouselImage && props.carouselImage.length > 0
            ? props.carouselImage.map((element, index) => <Image key={index} fluid src={element} />)
            : null}
        </Slider>
      </Row>

      <Row>
        <Card className="heroContent border-0 rounded-0 shadow">
          <Card.Body>
            <Card.Title className="fs-1 mb-4 fw-bold">Richiedi subito un preventivo gratuito</Card.Title>
            <Row className="mb-2">
              <Col className="fs-6 d-flex align-items-start">
                <div className="me-3">
                  <CheckLg className="text-primary fs-3" />
                </div>
                <div>
                  Tecnici abilitati, competenti e&nbsp; <span className="fw-bold">sistemi certificati</span>
                </div>
              </Col>
            </Row>

            <Row className="mb-2">
              <Col className="fs-6 d-flex align-items-start">
                <div className="me-3">
                  <CheckLg className="text-primary fs-3" />
                </div>
                <div>
                  Esperienza nel settore di&nbsp; <span className="fw-bold">oltre 60 anni</span>
                </div>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col className="fs-6 d-flex align-items-start">
                <div className="me-3">
                  <CheckLg className="text-primary fs-3" />
                </div>
                <div>
                  <span className="fw-bold">Tecnologia ed innovazione&nbsp;</span> sempre a servizio del cliente
                </div>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col className="fs-6 d-flex align-items-start">
                <div className="me-3">
                  <CheckLg className="text-primary fs-3" />
                </div>
                <div>
                  Dettaglio, &nbsp;<span className="fw-bold">cura del prodotto&nbsp;</span> e continua ricerca
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default Hero;
