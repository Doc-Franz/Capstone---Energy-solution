import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Registration = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <Container fluid style={{ marginTop: "180px" }}>
      <Row>
        <Col>
          <Form>
            <Form.Group className="mb-3">
              <Row>
                <Form.Label className="fs-3 fw-semibold text-primary-emphasis">Registrati</Form.Label>
              </Row>
              <Form.Text className="fs-6">Email</Form.Text>
              <Form.Control className="text-decoration-none border-0 rounded-0 border-bottom border-primary no-focus mb-3" type="email" required />
              <Form.Text className="fs-6">Username</Form.Text>
              <Form.Control className="text-decoration-none border-0 rounded-0 border-bottom border-primary no-focus mb-3" type="text" required />
              <Form.Text className="fs-6">Nome</Form.Text>
              <Form.Control className="text-decoration-none border-0 rounded-0 border-bottom border-primary no-focus mb-3" type="text" required />
              <Form.Text className="fs-6">Cognome</Form.Text>
              <Form.Control className="text-decoration-none border-0 rounded-0 border-bottom border-primary no-focus mb-3" type="text" required />
              <Form.Text className="fs-6">Password</Form.Text>
              <Form.Control className="text-decoration-none border-0 rounded-0 border-bottom border-primary no-focus" type="password" required />
              <Form.Text>Minimo 3 caratteri, massimo 20 caratteri</Form.Text>
              <Row>
                <Form.Text className="fs-6 mt-3 mb-2">Immagine di profilo 🕵️</Form.Text>
                <Form.Control className="no-focus" type="file" required />
              </Row>
              <Row className="d-flex flex-column mt-4">
                <Col>
                  Prendo atto{" "}
                  <span className="text-primary" style={{ cursor: "pointer" }}>
                    dell'informativa privacy
                  </span>{" "}
                </Col>
                <Col className="d-flex">
                  Accetto le<span>&nbsp;</span>
                  <span className="text-primary" style={{ cursor: "pointer" }}>
                    condizioni di utilizzo
                  </span>{" "}
                  <Form.Check className="ms-4" type="checkbox" onChange={handleCheckboxChange} />
                </Col>
              </Row>
            </Form.Group>
            <Button className="navigationBtn btn-primary mb-3" type="submit" disabled={!isChecked}>
              Continua
            </Button>
          </Form>
        </Col>
        {/* <Col>prova</Col> */}
      </Row>
    </Container>
  );
};

export default Registration;
