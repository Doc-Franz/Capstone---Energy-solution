import { Col, Container, Row } from "react-bootstrap";
import { GeoAlt } from "react-bootstrap-icons";

const Footer = () => {
  return (
    <Container fluid className="containerFooter d-flex flex-column mt-3">
      <Container>
        <Row className="d-flex flex-wrap border-bottom mt-2">
          <h3 className="mb-4">Energia per il futuro</h3>
          <Col className="footerLink text-nowrap mb-2" style={{ cursor: "pointer" }}>
            Chi siamo
          </Col>
          <Col className="footerLink text-nowrap mb-2" style={{ cursor: "pointer" }}>
            Lavora con noi
          </Col>
          <Col className="footerLink text-nowrap mb-2" style={{ cursor: "pointer" }}>
            Assistenza
          </Col>

          {/* ❗❗❗Collegare al GPS */}
          <Col className="footerLink text-nowrap mb-2" style={{ cursor: "pointer" }}>
            Dove trovarci <GeoAlt className="ms-1" />
          </Col>
        </Row>
        <Row className="d-flex flex-wrap mt-2" style={{ fontSize: "10px" }}>
          <Col className="text-nowrap mb-2" style={{ cursor: "pointer" }}>
            @ Energy Solution
          </Col>
          <Col className="text-nowrap mb-2" style={{ cursor: "pointer" }}>
            Informazioni societarie
          </Col>
          <Col className="text-nowrap mb-2" style={{ cursor: "pointer" }}>
            Informativa sulla privacy
          </Col>
          <Col className="text-nowrap mb-2" style={{ cursor: "pointer" }}>
            Condizioni generali d'uso
          </Col>
          <Col className="text-nowrap mb-2" style={{ cursor: "pointer" }}>
            Impostazioni della privacy
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Footer;
