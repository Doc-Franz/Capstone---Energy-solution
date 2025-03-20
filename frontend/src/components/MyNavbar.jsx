import { Badge, Button, Col, Container, Dropdown, Form, Image, Nav, Navbar, NavDropdown, OverlayTrigger, Row, Spinner, Tooltip } from "react-bootstrap";
import { List, X, ChevronRight, JournalText, Envelope, Search, BoxArrowInRight } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import { useEffect, useState } from "react";

function MyNavbar(props) {
  const navigate = useNavigate();

  // riprendo l'Id dell'utente per poter accedere ai suoi acquisti
  const userId = sessionStorage.getItem("userId");

  // stato che controlla se mostrare o meno il dropdown del Menu
  const [showMenu, setShowMenu] = useState(false);

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  // stato che controlla lo spinner
  const [spinnerIsLoading, setSpinnerIsLoading] = useState(false);

  // controllo dell'icona dell'utente
  const [avatar, setAvatar] = useState("");
  const [username, setUsername] = useState("");

  // stato che controlla se mostrare o meno la barra di ricerca
  const [isSearching, setIsSearching] = useState(false);

  // stato che controlla la stringa dentro la barra di ricerca
  const [searchBar, setSearchBar] = useState("");

  // al caricamento della pagina riprendo i dati da session storage
  useEffect(() => {
    const storedAvatar = sessionStorage.getItem("avatar");
    const storedUsername = sessionStorage.getItem("username");

    if (storedUsername) {
      setAvatar(storedAvatar);
      setUsername(storedUsername);
    }
  }, []);

  // metodo che controlla la barra di ricerca
  const handleSearch = () => {
    setIsSearching(!isSearching);
  };

  // metodo che gestisce la ricerca del prodotto
  const SearchProducts = (e) => {
    e.preventDefault();

    // viene salvato il prodotto ricercato
    const product = e.target.elements.product.value;

    console.log(product);

    // il prodotto ricecato viene inserito come parametro nell'URL e poi verrà ripreso nella pagina che mostrerà i risultati della ricerca
    navigate(`/search/${product}`);

    // reset della barra di ricerca
    setSearchBar("");
  };

  // metodo che controlla il logout dell'utente
  const handleExit = () => {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("avatar");

    setUsername("");
    setAvatar("");

    // gestione dell'opacità e spinner al momento del logout

    const body = document.querySelector("body");
    body.classList.add("pageLoading");

    // viene attivato lo spinner
    setSpinnerIsLoading(true);

    setTimeout(() => {
      body.classList.remove("pageLoading");

      // lo spinner viene disattivato
      setSpinnerIsLoading(false);
    }, 2000);
  };

  // metodo che gestisce lo scroll fino a building evaluation
  const handleScrollToEvaluation = () => {
    // quando clicco su "preventivo senza impegno" viene impostato uno stato su true
    navigate("/", { state: { scrollToEvaluation: true } });
  };

  return (
    <Navbar expand="lg" className="bg-white fixed-top">
      <Container className="d-flex flex-column align-items-start">
        {/* spinner che viene mostrato al caricamento al momento del logout */}
        {spinnerIsLoading ? (
          <Spinner
            animation="border"
            className="spinnerLogin"
            style={{
              width: "50px",
              height: "50px",
              position: "fixed",
              top: "50%",
              left: "50%",
              zIndex: 999
            }}
          />
        ) : null}

        <Row className="gx-0 w-100 d-flex justify-content-between align-items-center mt-2 mb-3">
          <Col className="col-4" md={3} xl={2}>
            <Link to="/" className="text-decoration-none">
              <Image fluid src={logo} />
            </Link>
          </Col>

          {/* se l'utente ha effettuato il login viene mostrato il suo avatar */}
          <Col className="avatarAndUsernameLowerXl ms-auto text-end">
            {username != "" ? (
              <Row className>
                <Dropdown>
                  <Dropdown.Toggle as="div" id="dropdown-basic" className="p-0 bg-transparent border-0 shadow-none w-100">
                    <Dropdown.Item className="dropdownAvatar products d-flex justify-content-between align-items-center dropdown-toggle">
                      <Col className="username d-flex justify-content-end">{username}</Col>
                      <Image fluid src={avatar} className="circularAvatar ms-3" style={{ maxHeight: "40px" }} />
                    </Dropdown.Item>
                  </Dropdown.Toggle>

                  <Dropdown.Menu align="end">
                    <Dropdown.Item as={Link} to={`/quotes/${userId}`}>
                      Profilo
                    </Dropdown.Item>
                    <Dropdown.Item>I miei ordini</Dropdown.Item>
                    <NavDropdown.Divider />
                    <Dropdown.Item onClick={handleExit}>Esci</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Row>
            ) : (
              <Navbar.Brand style={{ marginRight: "0px" }}>Logo 2</Navbar.Brand>
            )}
          </Col>
          <Col xl={10} className="linksHigherXl ms-auto text-end gx-0">
            <Row className="d-flex align-items-center">
              <Col className="col-4 d-flex justify-content-center">
                {/* ❗❗❗Inserire il link */}
                <Button
                  className="linkButtonJournal bg-transparent rounded-0"
                  style={{ color: "#568FCF", borderColor: "#568FCF" }}
                  onClick={handleScrollToEvaluation}
                >
                  <JournalText className="me-3" />
                  Preventivo senza impegno
                </Button>
              </Col>

              <Col className="d-flex justify-content-center" xl={3}>
                <Link to="/contacts" className="text-decoration-none">
                  <Button className="linkButton text-dark bg-transparent border-0 rounded-0">
                    <Envelope className="me-3" />
                    Contattaci
                  </Button>
                </Link>
              </Col>

              {username != "" ? null : (
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
                <Button className="linkButton text-dark bg-transparent border-0 rounded-0" onClick={handleSearch}>
                  <Search className="me-3" />
                  Cerca
                </Button>
              </Col>

              <Col className="avatarAndUsernameHigherXl ms-auto text-end">
                {/* se l'utente non è loggato rimane visibile l'icona di area riservata */}
                {username != "" ? (
                  <Row className>
                    <Dropdown>
                      <Dropdown.Toggle as="div" id="dropdown-basic" className="p-0 bg-transparent border-0 shadow-none w-100">
                        <Dropdown.Item className="dropdownAvatar products d-flex justify-content-between align-items-center dropdown-toggle">
                          <Col className="username d-flex justify-content-end">{username}</Col>
                          <Image fluid src={avatar} className="circularAvatar ms-3" style={{ maxHeight: "40px" }} />
                        </Dropdown.Item>
                      </Dropdown.Toggle>

                      <Dropdown.Menu align="end">
                        <Dropdown.Item>Profilo</Dropdown.Item>
                        <Dropdown.Item as={Link} to={`/quotes/${userId}`}>
                          I miei ordini
                        </Dropdown.Item>
                        <NavDropdown.Divider />
                        <Dropdown.Item onClick={handleExit}>Esci</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Row>
                ) : null}
              </Col>
            </Row>
          </Col>
        </Row>

        {/* barra di ricerca attiva quando si clicca sulla lente di ricerca */}
        {isSearching ? (
          <Col className="col-12 mb-3" sm={8} md={6} lg={4} xl={3}>
            <Form className="search" onSubmit={SearchProducts}>
              <Form.Control
                type="text"
                placeholder="Ricerca"
                id="product"
                value={searchBar}
                autoComplete="off"
                onChange={(e) => setSearchBar(e.target.value)}
              />
            </Form>
          </Col>
        ) : null}

        <Row className="gx-0 w-100 d-flex justify-content-start">
          <Col>
            <Navbar.Toggle className="toggle text-dark border-0 p-0 shadow-none" onClick={handleShowMenu}>
              {showMenu ? <X className="fs-3 me-2" /> : <List className="me-3" />}
              Menu
            </Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Dropdown>
                  <Dropdown.Toggle
                    as="div"
                    id="dropdown-autoclose-true"
                    className="p-0 bg-transparent border-0 shadow-none w-100"
                    style={{ cursor: "pointer" }}
                  >
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
                {username ? (
                  <Link to={`/quotes/${userId}`} className="text-decoration-none">
                    <Nav.Item
                      className={
                        props.quotesSelected
                          ? "navMenuLink navMenuLinkSelected d-flex justify-content-between align-items-center border-bottom"
                          : "navMenuLink d-flex justify-content-between align-items-center border-bottom"
                      }
                    >
                      <Button className="text-dark bg-transparent border-0 rounded-0 px-0">Ordini</Button>
                      <ChevronRight className="chevronRight ms-auto text-dark" />
                    </Nav.Item>
                  </Link>
                ) : null}

                <Link to="/assistance" className="text-decoration-none">
                  <Nav.Item
                    className={
                      props.assistanceSelected
                        ? "navMenuLink navMenuLinkSelected d-flex justify-content-between align-items-center border-bottom"
                        : "navMenuLink d-flex justify-content-between align-items-center border-bottom"
                    }
                  >
                    <Button className="text-dark bg-transparent border-0 rounded-0 px-0">Assistenza</Button>
                    <ChevronRight className="chevronRight ms-auto text-dark" />
                  </Nav.Item>
                </Link>

                <Link to="/information" className="text-decoration-none">
                  <Nav.Item
                    className={
                      props.informationSelected
                        ? "navMenuLink navMenuLinkSelected d-flex justify-content-between align-items-center border-bottom"
                        : "navMenuLink d-flex justify-content-between align-items-center border-bottom"
                    }
                  >
                    <Button className="text-dark bg-transparent border-0 rounded-0 px-0">Informazioni</Button>
                    <ChevronRight className="chevronRight ms-auto text-dark" />
                  </Nav.Item>
                </Link>

                <Link to="/photovoltaic" className="text-decoration-none">
                  <Nav.Item
                    className={
                      props.photovoltaicSelected
                        ? "navMenuLink navMenuLinkSelected d-flex justify-content-between align-items-center border-bottom"
                        : "navMenuLink d-flex justify-content-between align-items-center border-bottom"
                    }
                  >
                    <Button className="d-flex align-items-center text-dark bg-transparent border-0 rounded-0 px-0">
                      Fotovoltaico
                      <Badge className="photovoltaicBadge ms-2">new</Badge>
                    </Button>
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
            {username ? (
              <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltipLink">Ordini</Tooltip>}>
                <Button className="linkButtonJournal bg-transparent rounded-0 me-3" style={{ color: "#568FCF", borderColor: "#568FCF" }}>
                  <JournalText />
                </Button>
              </OverlayTrigger>
            ) : null}

            <Link to="/contacts" className="text-decoration-none">
              <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltipLink">Contattaci</Tooltip>}>
                <Button className="linkButton text-dark bg-transparent border-0 rounded-0 me-3">
                  <Envelope />
                </Button>
              </OverlayTrigger>
            </Link>

            {/* se l'utente non è loggato rimane visibile l'icona di area riservata */}
            {username != "" ? null : (
              <Link to="/reservedArea" className="text-decoration-none">
                <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltipLink">Area riservata</Tooltip>}>
                  <Button className="linkButton reservedAreaLowerSm text-dark bg-transparent border-0 rounded-0 me-3">
                    <BoxArrowInRight />
                  </Button>
                </OverlayTrigger>
              </Link>
            )}

            <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltipLink">Cerca</Tooltip>}>
              <Button className="linkButton text-dark bg-transparent border-0 rounded-0" onClick={handleSearch}>
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
