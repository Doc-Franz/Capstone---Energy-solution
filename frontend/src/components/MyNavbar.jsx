import { Button, Col, Container, Nav, Navbar, NavDropdown, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { List, ChevronRight, JournalText, Envelope, Search, BoxArrowInRight } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

function MyNavbar() {
  return (
    <Navbar expand="lg" className="bg-white fixed-top">
      <Container className="d-flex flex-column align-items-start">
        <Row className="gx-0 w-100 mb-4 d-flex justify-content-between">
          <Col>
            <Link to="/" className="text-decoration-none">
              <Navbar.Brand>Logo</Navbar.Brand>
            </Link>
          </Col>
          <Col className="ms-auto text-end">
            <Navbar.Brand style={{ marginRight: "0px" }}>Logo 2</Navbar.Brand>
          </Col>
          <Col xl={8} className="linksHigherXl ms-auto text-end">
            {/* ❗❗❗Inserire il link */}
            <Button className="linkButtonJournal text-primary bg-transparent rounded-0">
              <JournalText className="me-3" />
              Preventivo senza impegno
            </Button>

            <Link to="/contacts" className="text-decoration-none">
              <Button className="linkButton text-dark bg-transparent border-0 rounded-0">
                <Envelope className="me-3" />
                Contattaci
              </Button>
            </Link>

            <Link to="/reservedArea" className="text-decoration-none">
              <Button className="linkButton text-dark bg-transparent border-0 rounded-0">
                <BoxArrowInRight className="me-3" />
                Area riservata
              </Button>
            </Link>

            {/* ❗❗❗Va messo un link per il search?? */}
            <Button className="linkButton text-dark bg-transparent border-0 rounded-0">
              <Search className="me-3" />
              Cerca
            </Button>
          </Col>
        </Row>
        <Row className="gx-0 w-100 d-flex justify-content-start">
          <Col>
            <Navbar.Toggle className="toggle text-dark border-0 p-0 shadow-none" style={{}}>
              <List className="me-3" />
              Menu
            </Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Link to="/products" className="text-decoration-none">
                  <Nav.Item className="products d-flex justify-content-between align-items-center border-bottom">
                    <Button className="text-dark bg-transparent border-0 rounded-0 px-0">Prodotti</Button>
                    <ChevronRight className="chevronRight ms-auto text-dark" />
                  </Nav.Item>
                </Link>

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

            <Link to="/reservedArea" className="text-decoration-none">
              <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltipLink">Area riservata</Tooltip>}>
                <Button className="linkButton reservedAreaLowerSm text-dark bg-transparent border-0 rounded-0 me-3">
                  <BoxArrowInRight />
                </Button>
              </OverlayTrigger>
            </Link>

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
