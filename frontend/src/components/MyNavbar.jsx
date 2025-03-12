import { Button, Col, Container, Dropdown, Image, Nav, Navbar, NavDropdown, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { List, ChevronRight, JournalText, Envelope, Search, BoxArrowInRight } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.svg";

function MyNavbar() {
  // riprendo dallo store l'indirizzo dell'avatar
  const avatar = useSelector((state) => state.login.avatar);

  // riprendo dallo store username
  const username = useSelector((state) => state.login.username);

  return (
    <Navbar expand="lg" className="bg-white fixed-top">
      <Container className="d-flex flex-column align-items-start">
        <Row className="gx-0 w-100 d-flex justify-content-between align-items-center mt-2 mb-3">
          <Col className="col-4" md={3} xl={2}>
            <Link to="/" className="text-decoration-none">
              <Image fluid src={logo} />
            </Link>
          </Col>

          {/* se l'utente ha effettuato il login viene mostrato il suo avatar */}
          <Col className="avatarAndUsernameLowerXl ms-auto text-end">
            {username != null ? (
              <Row className>
                <Link to="/reservedArea" className="text-decoration-none d-flex align-items-center">
                  <Col className="username d-flex justify-content-end">{username}</Col>

                  <Image fluid src={avatar} className="circularAvatar ms-3" style={{ maxHeight: "40px" }} />
                </Link>
              </Row>
            ) : (
              <Navbar.Brand style={{ marginRight: "0px" }}>Logo 2</Navbar.Brand>
            )}
          </Col>
          <Col xl={10} className="linksHigherXl ms-auto text-end gx-0">
            <Row className="d-flex align-items-center">
              <Col className="col-4 d-flex justify-content-center">
                {/* ❗❗❗Inserire il link */}
                <Button className="linkButtonJournal text-primary bg-transparent rounded-0">
                  <JournalText className="me-3" />
                  Preventivo senza impegno
                </Button>
              </Col>

              <Col className="d-flex justify-content-center" xl={2}>
                <Link to="/contacts" className="text-decoration-none">
                  <Button className="linkButton text-dark bg-transparent border-0 rounded-0">
                    <Envelope className="me-3" />
                    Contattaci
                  </Button>
                </Link>
              </Col>

              {username != null ? null : (
                <Col className="d-flex justify-content-center" xl={3}>
                  <Link to="/reservedArea" className="text-decoration-none">
                    <Button className="linkButton text-dark bg-transparent border-0 rounded-0">
                      <BoxArrowInRight className="me-3" />
                      Area riservata
                    </Button>
                  </Link>
                </Col>
              )}

              {/* ❗❗❗Va messo un link per il search?? */}
              <Col className="d-flex justify-content-center" xl={2}>
                {" "}
                <Button className="linkButton text-dark bg-transparent border-0 rounded-0">
                  <Search className="me-3" />
                  Cerca
                </Button>
              </Col>

              <Col className="avatarAndUsernameHigherXl ms-auto text-end">
                {/* se l'utente non è loggato rimane visibile l'icona di area riservata */}
                {username != null ? (
                  <Row>
                    <Link to="/reservedArea" className="text-decoration-none d-flex align-items-center">
                      <Col className="username d-flex justify-content-end">{username}</Col>

                      <Image fluid src={avatar} className="circularAvatar ms-3" style={{ maxHeight: "40px" }} />
                    </Link>
                  </Row>
                ) : null}
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="gx-0 w-100 d-flex justify-content-start">
          <Col>
            <Navbar.Toggle className="toggle text-dark border-0 p-0 shadow-none">
              <List className="me-3" />
              Menu
            </Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Dropdown>
                  <Dropdown.Toggle as="div" id="dropdown-autoclose-true" className="p-0 bg-transparent border-0 shadow-none w-100">
                    <Nav.Item className="products d-flex justify-content-between align-items-center border-bottom">
                      <Button className="text-dark bg-transparent border-0 rounded-0 px-0">Prodotti</Button>
                      <ChevronRight className="chevronRight ms-auto text-dark" />
                    </Nav.Item>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="border-0 shadow-none">
                    {/* Tutti i prodotti */}

                    <Dropdown.Item as={Link} to="/allProducts" className="d-flex justify-content-between align-items-center border-bottom">
                      {" "}
                      <Button className="text-dark bg-transparent border-0 rounded-0 px-0">Tutti i prodotti</Button>
                      <ChevronRight className="chevronRightProducts ms-auto text-dark" />
                    </Dropdown.Item>

                    {/* Sistema geotermico */}

                    <Dropdown.Item as={Link} to="/geothermic" className="d-flex justify-content-between align-items-center border-bottom">
                      {" "}
                      <Button className="text-dark bg-transparent border-0 rounded-0 px-0">Sistemi geotermici</Button>
                      <ChevronRight className="chevronRightProducts ms-auto text-dark" />
                    </Dropdown.Item>

                    {/* Pompa di calore */}

                    <Dropdown.Item as={Link} to="/heatPump" className="d-flex justify-content-between align-items-center border-bottom">
                      {" "}
                      <Button className="text-dark bg-transparent border-0 rounded-0 px-0">Pompe di calore</Button>
                      <ChevronRight className="chevronRightProducts ms-auto text-dark" />
                    </Dropdown.Item>

                    {/* Caldaia tradizionale */}

                    <Dropdown.Item as={Link} to="/traditionalBoiler" className="d-flex justify-content-between align-items-center border-bottom">
                      {" "}
                      <Button className="text-dark bg-transparent border-0 rounded-0 px-0">Caldaie tradizionali</Button>
                      <ChevronRight className="chevronRightProducts ms-auto text-dark" />
                    </Dropdown.Item>

                    {/* Caldaia a condensazione */}

                    <Dropdown.Item as={Link} to="/condensingBoiler" className="d-flex justify-content-between align-items-center border-bottom">
                      {" "}
                      <Button className="text-dark bg-transparent border-0 rounded-0 px-0">Caldaie a condensazione</Button>
                      <ChevronRight className="chevronRightProducts ms-auto text-dark" />
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <Link to="/quotes" className="text-decoration-none">
                  <Nav.Item className="navMenuLink d-flex justify-content-between align-items-center border-bottom">
                    <Button className="text-dark bg-transparent border-0 rounded-0 px-0">Preventivi</Button>
                    <ChevronRight className="chevronRight ms-auto text-dark" />
                  </Nav.Item>
                </Link>

                <Link to="/assistance" className="text-decoration-none">
                  <Nav.Item className="navMenuLink d-flex justify-content-between align-items-center border-bottom">
                    <Button className="text-dark bg-transparent border-0 rounded-0 px-0">Assistenza</Button>
                    <ChevronRight className="chevronRight ms-auto text-dark" />
                  </Nav.Item>
                </Link>

                <Link to="/information" className="text-decoration-none">
                  <Nav.Item className="navMenuLink d-flex justify-content-between align-items-center border-bottom">
                    <Button className="text-dark bg-transparent border-0 rounded-0 px-0">Informazioni</Button>
                    <ChevronRight className="chevronRight ms-auto text-dark" />
                  </Nav.Item>
                </Link>

                <Link to="/professionals" className="text-decoration-none">
                  <Nav.Item className="navMenuLink d-flex justify-content-between align-items-center border-bottom">
                    <Button className="text-dark bg-transparent border-0 rounded-0 px-0">Professionisti</Button>
                    <ChevronRight className="chevronRight ms-auto text-dark" />
                  </Nav.Item>
                </Link>

                <Link to="/reservedArea" className="reservedAreaHigherSm text-decoration-none mt-2">
                  <Nav.Item className="navMenuLink d-flex justify-content-between align-items-center border-bottom">
                    <Row className="fs-5 text-dark fw-bold d-flex flex-column align-items-start">
                      <Col>Area riservata</Col>

                      <Col>
                        <Button className="reservedAreaHigherSm text-dark bg-transparent border-0 rounded-0">
                          <BoxArrowInRight className="me-3" />
                        </Button>
                        <Button className="text-dark bg-transparent border-0 rounded-0 px-0">Accedi</Button>
                      </Col>
                    </Row>
                  </Nav.Item>
                </Link>
              </Nav>
            </Navbar.Collapse>
          </Col>
          <Col className="linksLowerXl ms-auto text-end">
            <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltipLink">Preventivi</Tooltip>}>
              <Button className="linkButtonJournal text-primary bg-transparent rounded-0 me-3">
                <JournalText />
              </Button>
            </OverlayTrigger>

            <Link to="/contacts" className="text-decoration-none">
              <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltipLink">Contattaci</Tooltip>}>
                <Button className="linkButton text-dark bg-transparent border-0 rounded-0 me-3">
                  <Envelope />
                </Button>
              </OverlayTrigger>
            </Link>

            {/* se l'utente non è loggato rimane visibile l'icona di area riservata */}
            {username != null ? null : (
              <Link to="/reservedArea" className="text-decoration-none">
                <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltipLink">Area riservata</Tooltip>}>
                  <Button className="linkButton reservedAreaLowerSm text-dark bg-transparent border-0 rounded-0 me-3">
                    <BoxArrowInRight />
                  </Button>
                </OverlayTrigger>
              </Link>
            )}

            <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltipLink">Cerca</Tooltip>}>
              <Button className="linkButton text-dark bg-transparent border-0 rounded-0">
                <Search />
              </Button>
            </OverlayTrigger>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
