import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { buildProductsPage } from "../redux/actions/allProductsActions";
import MyNavbar from "./MyNavbar";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";

const Geothermic = () => {
  const dispatch = useDispatch();

  // mostrare i sistemi geotermici al caricamento della pagina
  useEffect(() => {
    dispatch(buildProductsPage("geothermic"));
  }, []);

  const geothermic = useSelector((state) => state.allProducts.content);

  return (
    <>
      <MyNavbar />
      <Container fluid className="hero" style={{ marginTop: "100px", paddingTop: "100px" }}>
        <Row className="fs-1 mb-4 fw-bold text-center">
          <Col>Sistemi geotermici</Col>
        </Row>
        <Container>
          <Row>
            {geothermic.map((product) => (
              <Col className="col-12 mb-4" sm={6} xl={4} xxl={3} key={product.id}>
                <Card className="shadow">
                  <Card.Img variant="top" src={product.image} style={{ paddingInline: "20%", paddingTop: "20%" }} />
                  <Card.Body>
                    <Card.Title className="text-center fs-3 fw-bold">{product.title}</Card.Title>
                    <Card.Text className="lead mb-2 text-center" style={{ marginBlockEnd: "0px" }}>
                      {product.description}
                    </Card.Text>

                    <Row className="my-3 g-0">
                      <Col className="col-2 px-0">
                        <Image fluid src={product.firstIcon} style={{ maxHeight: "40px" }} />
                      </Col>
                      <Col className="col-2 px-0">
                        <Image fluid src={product.secondIcon} style={{ maxHeight: "40px" }} />
                      </Col>
                      <Col className="col-2 px-0">
                        <Image fluid src={product.thirdIcon} style={{ maxHeight: "40px" }} />
                      </Col>
                    </Row>
                    <Row className="text-center mb-2">
                      <Col>
                        <Button className="btnBuyProduct mt-3 text-center" variant="primary">
                          Acquista
                        </Button>
                      </Col>{" "}
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default Geothermic;
