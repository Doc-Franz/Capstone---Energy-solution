import MyNavbar from "./MyNavbar";
import { useEffect, useState } from "react";
import { Button, Col, Container, FloatingLabel, Form, FormLabel, Image, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addNewRequest, resetRequestState } from "../redux/actions/RequestActions";
import registrationImage from "../assets/images/login/registration.jpeg";

const Contacts = () => {
  const dispatch = useDispatch();

  // controllo lo stato della checkbox delle condizioni di utilizzo
  const [isChecked, setIsChecked] = useState(false);

  // lo stato della checkbox viene aggiornato al click
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const hasSubmitted = useSelector((state) => state.request.hasSubmitted);

  // al caricamento della pagina vengono resettate tutte le informazioni
  useEffect(() => {
    dispatch(resetRequestState());
  }, []);

  // lo stato del form per la registrazione dell'utente viene inizializzato con un oggetto vuoto
  const [userRequest, setUserRequest] = useState({
    object: "",
    textArea: "",
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    phoneNumber: ""
  });

  // invio della richiesta
  const handleSubmit = (e) => {
    e.preventDefault();

    setUserRequest({
      object: e.target.elements.objectRequest.value,
      textArea: e.target.elements.textAreaRequest.value,
      firstName: e.target.elements.firstNameRequest.value,
      lastName: e.target.elements.lastNameRequest.value,
      email: e.target.elements.emailRequest.value,
      city: e.target.elements.cityRequest.value,
      phoneNumber: e.target.elements.phoneNumberRequest.value
    });

    // chiamata alla fetch con parametri oggetto con le info dell'utente e l'immagine
    dispatch(addNewRequest(userRequest));
  };

  return (
    <>
      <MyNavbar />;
      <Container fluid className="hero">
        <Container>
          {!hasSubmitted ? (
            <Row>
              <Col>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Row>
                      <Form.Label className="fs-3 fw-semibold text-primary-emphasis">Contattaci tramite il form online</Form.Label>
                    </Row>

                    <FormLabel className="mb-1">Oggetto *</FormLabel>
                    <Form.Select
                      className="formRegion mb-4"
                      id="objectRequest"
                      value={userRequest.object}
                      onChange={(e) => setUserRequest({ ...userRequest, object: e.target.value })}
                      required
                    >
                      <option value="Normative tecniche">Normative tecniche</option>
                      <option value="Assistenza">Assistenza</option>
                      <option value="Lavora con noi">Lavora con noi</option>
                      <option value="Manutenzione">Manutenzione</option>
                      <option value="Detrazioni e incentivi fiscali">Detrazioni e incentivi fiscali</option>
                    </Form.Select>

                    {/* <FloatingLabel label="Oggetto *" className="mb-3">
                      <Form.Control
                        className="text-decoration-none border-0 rounded-0 border-bottom no-focus mb-3"
                        id="objectRequest"
                        type="text"
                        value={userRequest.object}
                        onChange={(e) => setUserRequest({ ...userRequest, object: e.target.value })} // all'onchange nel campo lo state è in ascolto e la proprietà viene aggiornata tramite value
                        autoComplete="off"
                        placeholder="Oggetto *"
                        required
                      />
                    </FloatingLabel> */}

                    <FormLabel className="mb-1">Messaggio o commento *</FormLabel>
                    <Form.Control
                      as="textarea"
                      className="text-decoration-none rounded-0 no-focus mb-3"
                      id="textAreaRequest"
                      type="text"
                      value={userRequest.textArea}
                      onChange={(e) => setUserRequest({ ...userRequest, textArea: e.target.value })} // all'onchange nel campo lo state è in ascolto e la proprietà viene aggiornata tramite value
                      autoComplete="off"
                      placeholder="..."
                      required
                    />

                    <FloatingLabel label="Nome *" className="mb-3">
                      <Form.Control
                        className="text-decoration-none border-0 rounded-0 border-bottom no-focus mb-3"
                        id="firstNameRequest"
                        type="text"
                        value={userRequest.firstName}
                        onChange={(e) => setUserRequest({ ...userRequest, firstName: e.target.value })} // all'onchange nel campo lo state è in ascolto e la proprietà viene aggiornata tramite value
                        autoComplete="off"
                        placeholder="Nome *"
                        required
                      />
                    </FloatingLabel>

                    <FloatingLabel label="Cognome *" className="mb-3">
                      <Form.Control
                        className="text-decoration-none border-0 rounded-0 border-bottom no-focus mb-3"
                        id="lastNameRequest"
                        type="text"
                        value={userRequest.lastName}
                        onChange={(e) => setUserRequest({ ...userRequest, lastName: e.target.value })} // all'onchange nel campo lo state è in ascolto e la proprietà viene aggiornata tramite value
                        autoComplete="off"
                        placeholder="Cognome *"
                        required
                      />
                    </FloatingLabel>

                    <FloatingLabel label="Email *" className="mb-3">
                      <Form.Control
                        className="text-decoration-none border-0 rounded-0 border-bottom no-focus mb-3"
                        id="emailRequest"
                        type="email"
                        value={userRequest.email}
                        onChange={(e) => setUserRequest({ ...userRequest, email: e.target.value })} // all'onchange nel campo lo state è in ascolto e la proprietà viene aggiornata tramite value
                        autoComplete="off"
                        placeholder="Email *"
                        required
                      />
                    </FloatingLabel>

                    <FloatingLabel label="Città *" className="mb-3">
                      <Form.Control
                        className="text-decoration-none border-0 rounded-0 border-bottom no-focus mb-3"
                        id="cityRequest"
                        type="text"
                        value={userRequest.city}
                        onChange={(e) => setUserRequest({ ...userRequest, city: e.target.value })} // all'onchange nel campo lo state è in ascolto e la proprietà viene aggiornata tramite value
                        autoComplete="off"
                        placeholder="Città *"
                        required
                      />
                    </FloatingLabel>

                    <FloatingLabel label="Telefono" className="mb-3">
                      <Form.Control
                        className="text-decoration-none border-0 rounded-0 border-bottom no-focus mb-3"
                        id="phoneNumberRequest"
                        type="text"
                        value={userRequest.phoneNumber}
                        onChange={(e) => setUserRequest({ ...userRequest, phoneNumber: e.target.value })} // all'onchange nel campo lo state è in ascolto e la proprietà viene aggiornata tramite value
                        autoComplete="off"
                        placeholder="Telefono"
                        required
                      />
                    </FloatingLabel>

                    <Row className="d-flex flex-column mt-4">
                      <Col>
                        Prendo atto <span style={{ cursor: "pointer", color: "#568FCF" }}>dell'informativa privacy</span>{" "}
                      </Col>
                      <Col className="d-flex">
                        Accetto le<span>&nbsp;</span>
                        <span style={{ cursor: "pointer", color: "#568FCF" }}>condizioni di utilizzo</span>{" "}
                        <Form.Check className="checkRegistration ms-4" type="checkbox" onChange={handleCheckboxChange} />
                      </Col>
                    </Row>
                  </Form.Group>
                  <Button className="navigationBtn mb-3" type="submit" disabled={!isChecked}>
                    Continua
                  </Button>
                </Form>

                {/* spinner che gestisce la risposta alla registrazione */}
                {/* {loginLoading ? (
              <Row>
                <Col className="d-flex align-items-center">
                  <Spinner animation="border" />
                  <p className="ms-3">Tentativo di registrazione...</p>
                </Col>
              </Row>
            ) : hasSubmitted ? (
              registrationFailed ? (
                <Row className="text-danger">
                  <Col>Registrazione non andata a buon fine!</Col>
                </Row>
              ) : (
                <Row className="d-flex flex-column text-success">
                  <Col>Registrazione effettuata!</Col>
                  <Col>
                    <Link to="/reservedArea/login" style={{ color: "#568FCF" }}>
                      <Image src={pointer} className="me-2" alt="thumb icon" style={{ width: "40px", height: "40px" }}></Image>
                      Vai al login
                    </Link>
                  </Col>
                </Row>
              )
            ) : null} */}

                <Row className="loginProfessionals mt-5">
                  <h1>Innovazione senza confini </h1>
                  <p>Guardiamo al futuro, rimanendo sempre aggiornati sulle nuove tecnologie per offrire comfort, efficienza e un servizio all’avanguardia.</p>
                </Row>
              </Col>
              <Col className="imageLogin text-end">
                {/* ❗❗❗ Sostituire immagine */}
                <Image fluid src={registrationImage} className="energyImage" />
              </Col>
            </Row>
          ) : (
            <Row className="fs-1 mb-4 fw-bold text-center">
              <Col>Grazie per la richiesta! Riceverai una risposta il prima possibile</Col>
            </Row>
          )}
        </Container>
      </Container>
    </>
  );
};

export default Contacts;
