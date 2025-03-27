import { useDispatch, useSelector } from "react-redux";
import MyNavbar from "./MyNavbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserInfo } from "../redux/actions/profileActions";
import { Button, Col, Container, Form, Image, Modal, Row } from "react-bootstrap";
import pencil from "../assets/images/profilo/pencil.svg";

const Profile = () => {
  const dispatch = useDispatch();

  const param = useParams();
  const username = param.username;

  const userInfo = useSelector((state) => state.profile.user);

  // stato che controlla se sono state fatte modifiche alle info del profilo
  const [userProfile, setUserProfile] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: ""
  });

  // nel momento in cui ricevo le info dell'utente dallo store setto il profilo modificabile dal modale
  useEffect(() => {
    if (userInfo) {
      setUserProfile({
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        username: userInfo.username,
        email: userInfo.email
      });
    }
  }, [userInfo]);

  const [avatar, setAvatar] = useState(null);

  // al salvataggio del modale viene inviata la richiesta di modifica delle info di profilo
  const handleSaveNewInfo = (e) => {
    e.preventDefault();

    setUserProfile({
      firstName: e.target.elements.firstName.value,
      lastName: e.target.elements.lastName.value,
      username: e.target.elements.username.value,
      email: e.target.elements.email.value
    });
  };

  useEffect(() => {
    dispatch(getUserInfo(username));
  }, []);

  // gestione del modale
  const [modalShow, setModalShow] = useState(false);

  const handleModal = () => {
    setModalShow(true);
  };

  const handleCloseModal = () => {
    setModalShow(false);
  };

  return (
    <>
      <MyNavbar />
      <Container fluid className="hero">
        {userInfo ? (
          <Container>
            <Row>
              <Col>
                <Row className="mb-4 p-2">
                  <Col className="col-12 mb-3 d-flex justify-start-center align-items-end">
                    <Image fluid className="circularAvatar" style={{ width: "120px", height: "120px", border: "3px solid #568FCF" }} src={userInfo.avatar} />
                    <Image fluid src={pencil} style={{ width: "20px", height: "20px", cursor: "pointer" }} onClick={handleModal} />
                  </Col>
                  <Col>
                    <Row className="d-flex align-items-center">
                      <Col className="text-secondary-emphasis">Nome:</Col>
                      <Col>
                        <Form>
                          <Form.Group className="mb-3">
                            <Form.Control
                              className="fw-semibold text-decoration-none border-0 border-bottom rounded-0 no-focus mb-3"
                              type="text"
                              id="firstName"
                              value={userProfile.firstName}
                              onChange={(e) => setUserProfile({ ...userProfile, firstName: e.target.value })}
                            />
                          </Form.Group>
                        </Form>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="text-secondary-emphasis">Cognome:</Col>
                      <Col className="fw-semibold">{userInfo.lastName}</Col>
                    </Row>
                    <Row>
                      <Col className="text-secondary-emphasis">Username:</Col>
                      <Col className="fw-semibold">{userInfo.username}</Col>
                    </Row>
                    <Row>
                      <Col className="text-secondary-emphasis">Email:</Col>
                      <Col className="fw-semibold">{userInfo.email}</Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col className="imageLogin text-end"></Col>
            </Row>
          </Container>
        ) : null}

        {/* modale */}
        <Modal show={modalShow} size="md" centered>
          <Modal.Header closeButton onClick={handleCloseModal}>
            <Modal.Title id="contained-modal-title-vcenter">Modifica profilo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  id="firstName"
                  value={userProfile.firstName}
                  onChange={(e) => setUserProfile({ ...userProfile, firstName: e.target.value })}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button className="photovoltaicEvaluation" style={{ width: "100px" }} onClick={handleSaveNewInfo}>
              Salva
            </Button>
            <Button className="photovoltaicEvaluation" style={{ width: "100px" }} onClick={handleCloseModal}>
              Chiudi
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default Profile;
