import { useDispatch, useSelector } from "react-redux";
import MyNavbar from "./MyNavbar";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editProfileInfo, getUserInfo } from "../redux/actions/profileActions";
import { Button, Col, Container, Form, Image, Modal, Row } from "react-bootstrap";
import pencil from "../assets/images/profilo/pencil.svg";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  // username che recupero dall'URL -> mi serve per fare la ricerca nel db quando l'username ancora non è aggiornato e quindi mi serve quello precedente

  const previousUsername = params.username;

  useEffect(() => {
    dispatch(getUserInfo(previousUsername));
  }, [previousUsername]);

  const userInfo = useSelector((state) => state.profile.user);

  // stato che controlla se sono state fatte modifiche alle info del profilo
  const [userProfile, setUserProfile] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    avatar: ""
  });

  // nel momento in cui ricevo le info dell'utente dallo store setto il profilo modificabile dal modale
  useEffect(() => {
    if (userInfo) {
      setUserProfile({
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        username: userInfo.username,
        email: userInfo.email,
        avatar: userInfo.avatar
      });
    }
  }, [userInfo]);

  // al salvataggio del modale viene inviata la richiesta di modifica delle info di profilo
  const handleSaveNewInfo = (e) => {
    e.preventDefault();

    const updatedAvatar = e.target.elements.avatar.files.length > 0 ? e.target.elements.avatar.files[0] : userInfo.avatar;

    setUserProfile({
      firstName: e.target.elements.firstName.value,
      lastName: e.target.elements.lastName.value,
      username: e.target.elements.username.value,
      email: e.target.elements.email.value,
      avatar: updatedAvatar
    });

    dispatch(editProfileInfo(userProfile, previousUsername));

    navigate(`/profile/${e.target.elements.username.value}`);
  };

  // controllo del bottone per modificare le info del profilo
  const [showConfirmBtn, setShowConfirmBtn] = useState(false);

  // gestione della penna per moficare l'immagine profilo
  const imageRef = useRef(null);

  const handleClickOnPencil = () => {
    imageRef.current.click();
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
                  <Form onSubmit={handleSaveNewInfo}>
                    <Col className="col-12 mb-3 d-flex justify-start-center align-items-end">
                      <Image
                        fluid
                        className="circularAvatar"
                        style={{ width: "120px", height: "120px", border: "3px solid #568FCF" }}
                        src={userProfile.avatar || userInfo.avatar}
                      />
                      <div>
                        <Form.Control
                          type="file"
                          id="avatar"
                          ref={imageRef}
                          style={{ display: "none" }}
                          onChange={(e) => {
                            if (e.target.files.length > 0) {
                              const file = e.target.files[0];
                              setUserProfile({
                                ...userProfile,
                                avatar: URL.createObjectURL(file) // generazione di un URL temporaneo per visualizzare l'immagine in anteprima
                              });
                              setShowConfirmBtn(true);
                            }
                          }}
                        />
                        <Image fluid src={pencil} style={{ width: "20px", height: "20px", cursor: "pointer" }} onClick={handleClickOnPencil} />
                      </div>
                    </Col>
                    <Col>
                      <Row className="d-flex align-items-center">
                        <Col className="col-12 text-secondary-emphasis">Nome:</Col>
                        <Col className="col-10">
                          <Form.Group>
                            <Form.Control
                              className="fw-semibold text-decoration-none border-0 border-bottom rounded-0 no-focus"
                              type="text"
                              id="firstName"
                              value={userProfile.firstName}
                              onChange={(e) => (setUserProfile({ ...userProfile, firstName: e.target.value }), setShowConfirmBtn(true))}
                              autoComplete="off"
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="d-flex align-items-center">
                        <Col className="col-12 text-secondary-emphasis">Cognome:</Col>
                        <Col className="col-10">
                          <Form.Group>
                            <Form.Control
                              className="fw-semibold text-decoration-none border-0 border-bottom rounded-0 no-focus"
                              type="text"
                              id="lastName"
                              value={userProfile.lastName}
                              onChange={(e) => (setUserProfile({ ...userProfile, lastName: e.target.value }), setShowConfirmBtn(true))}
                              autoComplete="off"
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="d-flex align-items-center">
                        <Col className="col-12 text-secondary-emphasis">Username:</Col>
                        <Col className="col-10">
                          <Form.Group>
                            <Form.Control
                              className="fw-semibold text-decoration-none border-0 border-bottom rounded-0 no-focus"
                              type="text"
                              id="username"
                              value={userProfile.username}
                              onChange={(e) => (setUserProfile({ ...userProfile, username: e.target.value }), setShowConfirmBtn(true))}
                              autoComplete="off"
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="d-flex align-items-center">
                        <Col className="col-12 text-secondary-emphasis">Email:</Col>
                        <Col className="col-10">
                          <Form.Group>
                            <Form.Control
                              className="fw-semibold text-decoration-none border-0 border-bottom rounded-0 no-focus"
                              type="email"
                              id="email"
                              value={userProfile.email}
                              onChange={(e) => (setUserProfile({ ...userProfile, email: e.target.value }), setShowConfirmBtn(true))}
                              autoComplete="off"
                            />
                          </Form.Group>
                          <Row className="mt-4">
                            {showConfirmBtn ? (
                              <Button type="submit" className="photovoltaicEvaluation mb-4" style={{ width: "200px" }}>
                                Conferma modifiche
                              </Button>
                            ) : null}
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                  </Form>
                </Row>
              </Col>
              <Col className="imageLogin text-end"></Col>
            </Row>
          </Container>
        ) : null}
      </Container>
    </>
  );
};

export default Profile;
