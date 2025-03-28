import { Col, Container, Image, Row } from "react-bootstrap";
import logo from "../assets/images/logo.svg";
import cancel from "../assets/images/cancel.svg";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Cancel = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 3000);
  }, []);

  return (
    <>
      <Container fluid className="headerLogin">
        <Container>
          <Row>
            <Col className="col-4 mt-2 mb-3" md={3} xl={2}>
              <Link to="/" className="text-decoration-none">
                <Image fluid src={logo} />
              </Link>
            </Col>
          </Row>
        </Container>
      </Container>
      <Container style={{ marginTop: "80px" }}>
        <Row>
          <Col className="text-center" style={{ fontSize: "40px", color: "#E80909" }}>
            TRANSAZIONE RIFIUTATA!
          </Col>
        </Row>
        <Row className="mt-3 d-flex justify-content-center">
          <Col className="col-4" md={3} lg={2}>
            {" "}
            <Image fluid src={cancel} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Cancel;
