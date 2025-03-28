import { Col, Container, Image, Row } from "react-bootstrap";
import logo from "../assets/images/logo.svg";
import success from "../assets/images/success.svg";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Success = () => {
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
          <Col className="text-center" style={{ fontSize: "40px", color: "rgb(4, 109, 4)" }}>
            PAGAMENTO AVVENUTO CON SUCCESSO!
          </Col>
        </Row>
        <Row className="mt-3 d-flex justify-content-center">
          <Col className="col-4" md={3} lg={2}>
            {" "}
            <Image fluid src={success} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Success;
