import { Card, Container, Row } from "react-bootstrap";

const Hero = () => {
  return (
    <Container fluid>
      <Row
        className="mt-3"
        style={{
          backgroundImage: `url("https://thingscareerrelated.com/wp-content/uploads/2021/10/default-background-image.png?w=862")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "400px",
          position: "relative"
        }}
      ></Row>
      <Row>
        <Card className="heroContent border-0 rounded-0">
          <Card.Body>
            <Card.Title className="fs-1 fw-bold">Card Title</Card.Title>
            <Card.Text className="fs-5">Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default Hero;
