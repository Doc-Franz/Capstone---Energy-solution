import { useEffect, useState } from "react";
import { Button, Col, Container, FloatingLabel, Form, Image, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addUser, resetFormAction, resetRegistrationState } from "../redux/actions/registrationActions";
import { Link } from "react-router-dom";
import {} from "../../src/assets/images/thumb.svg";
import registrationImage from "../assets/images/login/registration.jpeg";
import boy from "../assets/images/login/boy.svg";
import pointer from "../assets/images/login/pointer.svg";
import logo from "../assets/images/logo.svg";

const Registration = () => {
  const dispatch = useDispatch();

  // controllo lo stato della checkbox delle condizioni di utilizzo
  const [isChecked, setIsChecked] = useState(false);

  // lo stato della checkbox viene aggiornato al click
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  // lo stato del form per la registrazione dell'utente viene inizializzato con un oggetto vuoto
  const [userRegistration, setUserRegistration] = useState({
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    password: ""
  });

  // l'avatar dell'utente inizializzato a null
  const [avatar, setAvatar] = useState(null);

  // resetForm (TRUE/FALSE) è la proprietà nello stato globale che permette di controllare quando resettare il form -> se TRUE (fetch andata a buon fine) reset del form
  const resetFormState = useSelector((state) => state.registration.resetForm);

  const hasSubmitted = useSelector((state) => state.registration.hasSubmitted);

  const registrationFailed = useSelector((state) => state.registration.registrationFailed);

  // all'aggiornamento della variabile di controllo viene chiamato il reset del form
  useEffect(() => {
    if (resetFormState) {
      resetForm();
    }
  }, [resetFormState]);

  useEffect(() => {
    // al caricamento della pagina vengono resettati tutti gli stati
    dispatch(resetRegistrationState());
  }, []);

  // registrazione dell'utente
  const handleSubmit = (e) => {
    e.preventDefault();

    setUserRegistration({
      email: e.target.elements.emailRegistration.value,
      username: e.target.elements.usernameRegistration.value,
      firstName: e.target.elements.firstNameRegistration.value,
      lastName: e.target.elements.lastNameRegistration.value,
      password: e.target.elements.passwordRegistration.value
    });

    setAvatar(e.target.elements.avatarRegistration.files[0]);

    // chiamata alla fetch con parametri oggetto con le info dell'utente e l'immagine
    dispatch(addUser(userRegistration, avatar));
  };

  // reset del form
  const resetForm = () => {
    setUserRegistration({
      email: "",
      username: "",
      firstName: "",
      lastName: "",
      password: ""
    });

    setAvatar(null);
    setIsChecked(false);

    // forzatura a resettare l'immagine tramite DOM manipulation
    document.getElementById("avatarRegistration").value = "";

    // lo stato resetFormState viene riportato su FALSE
    dispatch(resetFormAction());
  };

  // stato che controlla lo spinner al caricamento della registrazione
  const loginLoading = useSelector((state) => state.registration.isLoading);

  return (
    <>
      <Container fluid className="headerLogin">
        <Container>
          <Row className="">
            <Col className="col-4 mt-2 mb-3" md={3} xl={2}>
              <Link to="/" className="text-decoration-none">
                <Image fluid src={logo} />
              </Link>
            </Col>
          </Row>
        </Container>
      </Container>
      <Container>
        <Row style={{ marginTop: "50px" }}>
          <Col>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Row>
                  <Form.Label className="fs-3 fw-semibold text-primary-emphasis">Registrati</Form.Label>
                </Row>

                <FloatingLabel label="Email *" className="mb-3">
                  <Form.Control
                    className="text-decoration-none border-0 rounded-0 border-bottom no-focus mb-3"
                    id="emailRegistration"
                    type="email"
                    value={userRegistration.email}
                    onChange={(e) => setUserRegistration({ ...userRegistration, email: e.target.value })} // all'onchange nel campo lo state è in ascolto e la proprietà viene aggiornata tramite value
                    autoComplete="off"
                    placeholder="Email *"
                    required
                  />
                </FloatingLabel>

                <FloatingLabel label="Username *" className="mb-3">
                  <Form.Control
                    className="text-decoration-none border-0 rounded-0 border-bottom no-focus mb-3"
                    id="usernameRegistration"
                    type="text"
                    value={userRegistration.username}
                    onChange={(e) => setUserRegistration({ ...userRegistration, username: e.target.value })}
                    autoComplete="off"
                    placeholder="Username *"
                    required
                  />
                </FloatingLabel>

                <FloatingLabel label="Nome *" className="mb-3">
                  <Form.Control
                    className="text-decoration-none border-0 rounded-0 border-bottom no-focus mb-3"
                    id="firstNameRegistration"
                    type="text"
                    value={userRegistration.firstName}
                    onChange={(e) => setUserRegistration({ ...userRegistration, firstName: e.target.value })}
                    autoComplete="off"
                    placeholder="Nome *"
                    required
                  />
                </FloatingLabel>

                <FloatingLabel label="Cognome *" className="mb-3">
                  <Form.Control
                    className="text-decoration-none border-0 rounded-0 border-bottom no-focus mb-3"
                    id="lastNameRegistration"
                    type="text"
                    value={userRegistration.lastName}
                    onChange={(e) => setUserRegistration({ ...userRegistration, lastName: e.target.value })}
                    autoComplete="off"
                    placeholder="Cognome *"
                    required
                  />
                </FloatingLabel>

                <FloatingLabel label="Password *" className="mb-3">
                  <Form.Control
                    className="text-decoration-none border-0 rounded-0 border-bottom no-focus"
                    id="passwordRegistration"
                    type="password"
                    value={userRegistration.password}
                    onChange={(e) => setUserRegistration({ ...userRegistration, password: e.target.value })}
                    autoComplete="off"
                    placeholder="Password *"
                    required
                  />
                </FloatingLabel>

                <Form.Text>Minimo 3 caratteri, massimo 20 caratteri</Form.Text>
                <Row className="fs-6 mt-3 mb-2">
                  <Col className="mb-2">
                    Immagine di profilo
                    <Image fluid src={boy} className="ms-2" style={{ width: "25px", height: "25px" }} />
                  </Col>
                  <Form.Control className="no-focus" type="file" id="avatarRegistration" onChange={(e) => setAvatar(e.target.files[0])} required />
                </Row>
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
            {loginLoading ? (
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
            ) : null}

            <Row className="loginProfessionals mt-5">
              <h1>Guardiamo al futuro </h1>
              <p>Guardiamo al futuro, rimanendo sempre aggiornati sulle nuove tecnologie per offrire comfort, efficienza e un servizio all’avanguardia.</p>
            </Row>
          </Col>
          <Col className="imageLogin text-end">
            {/* ❗❗❗ Sostituire immagine */}
            <Image fluid src={registrationImage} className="energyImage" />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Registration;
