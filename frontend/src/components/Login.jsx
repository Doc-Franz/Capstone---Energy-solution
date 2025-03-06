import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { InfoCircleFill } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { login, prova, resetLoginAction } from "../redux/actions/loginAction";

const Login = () => {
  const dispatch = useDispatch();

  // const tokenUser = useSelector((state) => state.login.token);

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
  const resetLoginState = useSelector((state) => state.login.resetLogin);

  // all'aggiornamento della variabile di controllo viene chiamato il reset del form
  useEffect(() => {
    if (resetLoginState) {
      resetLoginForm();
    }
  }, [resetLoginState]);

  // reset del form
  const resetLoginForm = () => {
    setLoginUser({
      username: "",
      password: ""
    });

    dispatch(resetLoginAction());
  };

  // ❗❗❗ metodo di prova
  const handleButtonDiProva = () => {
    const tokenUser = localStorage.getItem("token");
    dispatch(prova(tokenUser));
  };

  return (
    <Container style={{ marginTop: "180px" }}>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Row>
                <Form.Label className="fs-3 fw-semibold text-primary-emphasis">
                  Iscriviti o accedi <InfoCircleFill className="ms-2" style={{ height: "18px", width: "18px", color: "#126FA4" }} />
                </Form.Label>
              </Row>
              <Form.Text className="fs-6">Username</Form.Text>
              <Form.Control
                className="text-decoration-none border-0 rounded-0 border-bottom no-focus mb-3"
                type="text"
                id="loginUsername"
                value={loginUser.username}
                onChange={(e) => setLoginUser({ ...loginUser, username: e.target.value })} // all'onchange nel campo lo state è in ascolto e la proprietà viene aggiornata tramite value
                autoComplete="off"
                required
              />
              <Form.Text className="fs-6">Password</Form.Text>
              <Form.Control
                className="text-decoration-none border-0 rounded-0 border-bottom no-focus"
                type="password"
                id="loginPassword"
                value={loginUser.password}
                onChange={(e) => setLoginUser({ ...loginUser, password: e.target.value })} // all'onchange nel campo lo state è in ascolto e la proprietà viene aggiornata tramite value
                autoComplete="off"
                required
              />
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
            {/* ❗❗❗Bottone di prova  */}
            <Button className="navigationBtn btn-danger mb-3" onClick={handleButtonDiProva}>
              Bottone di prova
            </Button>

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
