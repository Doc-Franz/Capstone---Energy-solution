import { Col, Container, Row } from "react-bootstrap";
import { GeoAlt } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Container fluid className="containerFooter d-flex flex-column mt-3">
      <Container>
        <Row className="d-flex flex-wrap border-bottom mt-2">
          <h3 className="mb-4">Energia per il futuro</h3>
          <Col className="footerLink text-nowrap mb-2" style={{ cursor: "pointer" }}>
            <Link to="/information" className="text-decoration-none footerLink text-dark">
              Chi siamo
            </Link>
          </Col>
          <Col className="footerLink text-nowrap mb-2" style={{ cursor: "pointer" }}>
            <Link to="/contacts" className="text-decoration-none footerLink text-dark">
              Lavora con noi
            </Link>
          </Col>
          <Col className="footerLink text-nowrap mb-2" style={{ cursor: "pointer" }}>
            <Link to="/assistance" className="text-decoration-none footerLink text-dark">
              Assistenza
            </Link>
          </Col>

          {/* ❗❗❗Collegare al GPS */}
          <Col className="footerLink text-nowrap mb-2" style={{ cursor: "pointer" }}>
            <Link
              to="https://www.google.com/maps/place/Via+Mauro+Venegoni,+23,+21012+Cassano+Magnago+VA/@45.668221,8.8140566,16z/data=!3m1!4b1!4m6!3m5!1s0x478689baa0b64b7b:0xcb6b9c845bdad513!8m2!3d45.6682173!4d8.8166315!16s%2Fg%2F11c13grbg6?entry=ttu&g_ep=EgoyMDI1MDMyMy4wIKXMDSoJLDEwMjExNDUzSAFQAw%3D%3D"
              className="text-decoration-none footerLink text-dark"
              target="_blank"
            >
              Dove trovarci <GeoAlt className="ms-1" />
            </Link>
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
