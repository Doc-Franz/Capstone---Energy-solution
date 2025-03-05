import { useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import RegistrationImage from "../../src/assets/images/registrationImage.png";

const Registration = () => {
  // controllo lo stato della checkbox delle condizioni di utilizzo
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <Container style={{ marginTop: "180px" }}>
      <Row>
        <Col>
          <Form>
            <Form.Group className="mb-3">
              <Row>
                <Form.Label className="fs-3 fw-semibold text-primary-emphasis">Registrati</Form.Label>
              </Row>
              <Form.Text className="fs-6">Email</Form.Text>
              <Form.Control className="text-decoration-none border-0 rounded-0 border-bottom no-focus mb-3" type="email" required />
              <Form.Text className="fs-6">Username</Form.Text>
              <Form.Control className="text-decoration-none border-0 rounded-0 border-bottom no-focus mb-3" type="text" required />
              <Form.Text className="fs-6">Nome</Form.Text>
              <Form.Control className="text-decoration-none border-0 rounded-0 border-bottom no-focus mb-3" type="text" required />
              <Form.Text className="fs-6">Cognome</Form.Text>
              <Form.Control className="text-decoration-none border-0 rounded-0 border-bottom no-focus mb-3" type="text" required />
              <Form.Text className="fs-6">Password</Form.Text>
              <Form.Control className="text-decoration-none border-0 rounded-0 border-bottom no-focus" type="password" required />
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
          <Row className="loginProfessionals mt-5">
            <h1>Guardiamo al futuro </h1>
            <p>Guardiamo al futuro, rimanendo sempre aggiornati sulle nuove tecnologie per offrire comfort, efficienza e un servizio all’avanguardia.</p>
          </Row>
        </Col>
        <Col className="imageLogin">
          {/* ❗❗❗ Sostituire immagine */}
          <Image
            src="https://files.oaiusercontent.com/file-GPGER17p3Jyi8YRqaHjm2s?se=2025-03-05T10%3A48%3A47Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D4765f165-bad4-46d4-82b9-84f22da45e58.webp&sig=sjIgTviIh1AQ67opwQDZZkOUKT3/qDjT7n7oAVt33VM%3D"
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Registration;
