import { Col, Container, Row } from "react-bootstrap";
import { GeoAlt } from "react-bootstrap-icons";

const Footer = () => {
  return (
    <Container className="d-flex flex-column" style={{ minHeight: "20vh" }}>
      <Row className="d-flex flex-wrap mt-auto">
        <h2>Energia per il futuro</h2>
        <Col className="text-nowrap mb-2" style={{ cursor: "pointer" }}>
          Chi siamo
        </Col>
        <Col className="text-nowrap mb-2" style={{ cursor: "pointer" }}>
          Lavora con noi
        </Col>
        <Col className="text-nowrap mb-2" style={{ cursor: "pointer" }}>
          Assistenza
        </Col>

        {/* ❗❗❗Collegare al GPS */}
        <Col className="text-nowrap mb-2" style={{ cursor: "pointer" }}>
          Dove trovarci <GeoAlt className="ms-1" />
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
