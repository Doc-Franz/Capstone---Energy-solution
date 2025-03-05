import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { InfoCircleFill } from "react-bootstrap-icons";

const Login = () => {
  return (
    <Container fluid style={{ marginTop: "220px" }}>
      <Row>
        <Col>
          <Form>
            <Form.Group className="mb-3">
              <Row>
                <Form.Label className="fs-3 fw-semibold text-primary-emphasis">
                  Iscriviti o accedi <InfoCircleFill className="ms-2" style={{ height: "18px", width: "18px", color: "#126FA4" }} />
                </Form.Label>
              </Row>
              <Form.Text className="fs-6">Username</Form.Text>
              <Form.Control className="text-decoration-none border-0 rounded-0 border-bottom border-primary no-focus mb-3" type="text" />
              <Form.Text className="fs-6">Password</Form.Text>
              <Form.Control className="text-decoration-none border-0 rounded-0 border-bottom border-primary no-focus" type="password" />
            </Form.Group>
            <Button className="navigationBtn btn-primary mb-3">Login</Button>
            <Row>
              <Form.Text>
                Non sei ancora nostro cliente? <Link to={"/reservedArea/registration"}>Registrati</Link>
              </Form.Text>
            </Row>
          </Form>
        </Col>
        {/* <Col>prova</Col> */}
      </Row>
    </Container>
  );
};

export default Login;
