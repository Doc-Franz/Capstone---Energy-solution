import { Button, Col, Container, FloatingLabel, Form, Image, Row, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { InfoCircleFill } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { login, resetLoginAction, resetLoginState, spinnerLoading } from "../redux/actions/loginAction";
import loginImage from "../assets/images/login/login.jpeg";
import logo from "../assets/images/logo.svg";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isRegistered = useSelector((state) => state.login.isRegistered); // variabile che controlla se l'utente può effettuare il login
  const hasSubmitted = useSelector((state) => state.login.hasSubmitted); // variabile che controlla se l'utente ha submittato

  const goToHomepage = useSelector((state) => state.login.goToHomepage); // variabile che controlla lo spinner prima del reindirizzamento all'homepage

  // al caricamento della pagina vengono resettati tutti gli stati
  useEffect(() => {
    dispatch(resetLoginState());
  }, []);

  // inizializzazione dello stato del login user
  const [loginUser, setLoginUser] = useState({
    username: "",
    password: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoginUser({
      username: e.target.elements.loginUsername.value,
      password: e.target.elements.loginPassword.value
    });

    dispatch(login(loginUser));
  };

  // resetLogin (TRUE/FALSE) è la proprietà nello stato globale che permette di controllare quando resettare il form -> se TRUE (fetch andata a buon fine) reset del form
  const loginToReset = useSelector((state) => state.login.resetLogin);

  // all'aggiornamento della variabile di controllo viene chiamato il reset del form
  useEffect(() => {
    if (loginToReset) {
      resetLoginForm();
    }
  }, [loginToReset]);

  // ❗❗❗❗❗❗ DA SISTEMARE
  useEffect(() => {
    if (isRegistered) {
      /* viene aggiunta opacità al caricamento dopo il login */
      const body = document.querySelector("body");
      body.classList.add("pageLoading");

      // viene attivato lo spinner
      dispatch(spinnerLoading(true));

      setTimeout(() => {
        navigate("/");
        body.classList.remove("pageLoading");

        // lo spinner viene disattivato
        dispatch(spinnerLoading(false));

        // gli state del login vengono resettati
        dispatch(resetLoginState());
      }, 2000);
    }
  }, [isRegistered]);

  // reset del form
  const resetLoginForm = () => {
    setLoginUser({
      username: "",
      password: ""
    });

    dispatch(resetLoginAction());
  };

  // ❗❗❗ ❗metodo di prova
  // const handleButtonDiProva = () => {
  //   const tokenUser = sessionStorage.getItem("token");
  //   dispatch(prova(tokenUser));
  // };

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
        {/* spinner che viene mostrato al caricamento della homepage dopo il login */}
        {goToHomepage ? (
          <Spinner
            animation="border"
            className="spinnerLogin"
            style={{
              width: "50px",
              height: "50px",
              position: "absolute",
              top: "50%",
              left: "50%",
              zIndex: 999
            }}
          />
        ) : null}

        <Row style={{ marginTop: "50px" }}>
          <Col>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Row>
                  <Form.Label className="fs-3 fw-semibold text-primary-emphasis">
                    Iscriviti o accedi <InfoCircleFill className="ms-2" style={{ height: "18px", width: "18px", color: "#126FA4" }} />
                  </Form.Label>
                </Row>

                <FloatingLabel label="Username" className="mb-3">
                  <Form.Control
                    className="text-decoration-none border-0 rounded-0 border-bottom no-focus mb-3"
                    type="text"
                    id="loginUsername"
                    value={loginUser.username}
                    onChange={(e) => setLoginUser({ ...loginUser, username: e.target.value })} // all'onchange nel campo lo state è in ascolto e la proprietà viene aggiornata tramite value
                    autoComplete="off"
                    placeholder="name@example.com"
                    required
                  />
                </FloatingLabel>

                <FloatingLabel label="Password" className="mb-3">
                  <Form.Control
                    className="text-decoration-none border-0 rounded-0 border-bottom no-focus"
                    type="password"
                    id="loginPassword"
                    value={loginUser.password}
                    onChange={(e) => setLoginUser({ ...loginUser, password: e.target.value })} // all'onchange nel campo lo state è in ascolto e la proprietà viene aggiornata tramite value
                    autoComplete="off"
                    placeholder="password"
                    required
                  />
                </FloatingLabel>
              </Form.Group>
              <Button className="navigationBtn btn-primary mb-3" type="submit">
                Login
              </Button>

              {/* l'utente non ha ancora mandato il submit? */}
              {!hasSubmitted ? null : isRegistered ? null : ( // ora che ha mandato il submit, l'utente è registrato o no?
                <Row className="text-danger mb-2">
                  <Col>Credenziali inserite non valide!</Col>
                </Row>
              )}
              <Row>
                <Form.Text>
                  Non sei ancora nostro cliente?{" "}
                  <Link to={"/reservedArea/registration"} style={{ color: "#568FCF" }}>
                    Registrati
                  </Link>
                </Form.Text>
              </Row>
            </Form>
            <Row className="loginProfessionals mt-5">
              {/* ❗❗❗Bottone di prova  */}
              {/* <Button className="navigationBtn btn-danger mb-3" onClick={handleButtonDiProva}>
                Bottone di prova
              </Button> */}

              <h1>Professionisti nel settore</h1>
              <p>
                La nostra azienda è specializzata e professionista nel settore della climatizzazione da anni, offrendo soluzioni affidabili con caldaie e pompe
                di calore. Garantiamo comfort, efficienza e un servizio impeccabile per ogni esigenza.
              </p>
            </Row>
          </Col>
          <Col className="imageLogin text-end">
            <Image fluid src={loginImage} className="energyImage" />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
