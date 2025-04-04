import { Button, Card, Container } from "react-bootstrap";
import { KeyFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const LoginCard = (props) => {
  return (
    <Container ref={props.ref} style={{ marginTop: "30px", paddingTop: "1px" }}>
      <Card className="cardLogin">
        <Card.Header className="fs-3 fw-semibold border-bottom-0" style={{ backgroundColor: "rgba(13, 110, 253, 0.1)" }}>
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
  );
};

export default LoginCard;
