import { Button, Card, Container, Row } from "react-bootstrap";
import Hero from "./Hero";
import { KeyFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import MyNavbar from "./MyNavbar";

const ReservedArea = () => {
  return (
    <>
      <MyNavbar />
      <Hero />
      <Container style={{ marginTop: "120px" }}>
        <Card className="cardLogin">
          <Card.Header className="fs-3 fw-semibold text-primary-emphasis">
            <KeyFill className="text-warning me-4" style={{ height: "60px", width: "60px" }} />
            Area riservata
          </Card.Header>
          <Card.Body>
            <Card.Text>Per accedere all'area riservata, clicca su Accedi ed inserisci le credenziali</Card.Text>
            <Link to="/reservedArea/login" className="text-decoration-none">
              <Button variant="primary" className="navigationBtn rounded-0">
                Accedi
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default ReservedArea;
