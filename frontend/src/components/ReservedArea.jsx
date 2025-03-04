import { Button, Card, Container, Row } from "react-bootstrap";
import Hero from "./Hero";

const ReservedArea = () => {
  return (
    <>
      <Hero />
      <Container style={{ marginTop: "200px" }}>
        <Card>
          <Card.Header>Featured</Card.Header>
          <Card.Body>
            <Card.Title>Special title treatment</Card.Title>
            <Card.Text>With supporting text below as a natural lead-in to additional content.</Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default ReservedArea;
