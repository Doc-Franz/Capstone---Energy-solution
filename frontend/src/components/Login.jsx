import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { InfoCircleFill } from "react-bootstrap-icons";

const Login = () => {
  return (
    <Container style={{ marginTop: "180px" }}>
      <Row>
        <Col>
          <Form>
            <Form.Group className="mb-3">
              <Row>
                <Form.Label className="fs-3 fw-semibold text-primary-emphasis">
                  Iscriviti o accedi <InfoCircleFill className="ms-2" style={{ height: "18px", width: "18px", color: "#126FA4" }} />
                </Form.Label>
              </Row>
              <Form.Text className="fs-6">Username</Form.Text>
              <Form.Control className="text-decoration-none border-0 rounded-0 border-bottom no-focus mb-3" type="text" required />
              <Form.Text className="fs-6">Password</Form.Text>
              <Form.Control className="text-decoration-none border-0 rounded-0 border-bottom no-focus" type="password" required />
            </Form.Group>
            <Button className="navigationBtn btn-primary mb-3" type="submit">
              Login
            </Button>
            <Row>
              <Form.Text>
                Non sei ancora nostro cliente? <Link to={"/reservedArea/registration"}>Registrati</Link>
              </Form.Text>
            </Row>
          </Form>
          <Row className="loginProfessionals mt-5">
            <h1>Professionisti nel settore</h1>
            <p>
              La nostra azienda è specializzata e professionista nel settore della climatizzazione da anni, offrendo soluzioni affidabili con caldaie e pompe di
              calore. Garantiamo comfort, efficienza e un servizio impeccabile per ogni esigenza.
            </p>
          </Row>
        </Col>
        <Col className="imageLogin">
          <Image
            src="https://files.oaiusercontent.com/file-GPGER17p3Jyi8YRqaHjm2s?se=2025-03-05T10%3A48%3A47Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D4765f165-bad4-46d4-82b9-84f22da45e58.webp&sig=sjIgTviIh1AQ67opwQDZZkOUKT3/qDjT7n7oAVt33VM%3D"
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
