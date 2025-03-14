import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { buildProductsPage } from "../redux/actions/allProductsActions";
import MyNavbar from "./MyNavbar";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";

const HeatPump = () => {
  const dispatch = useDispatch();

  const username = sessionStorage.getItem("username"); // variabile che controlla se l'utente ha credenziali per navigare nella pagina

  // mostrare i sistemi geotermici al caricamento della pagina
  useEffect(() => {
    dispatch(buildProductsPage("heatPump"));
  }, []);

  const heatPump = useSelector((state) => state.allProducts.content);

  return (
    <>
      <MyNavbar />
      <Container fluid className="hero" style={{ marginTop: "100px", paddingTop: "100px" }}>
        <Row className="fs-1 mb-4 fw-bold text-center">
          <Col>Sistemi in pompa di calore</Col>
        </Row>
        <Container>
          <Row>
            {heatPump.map((product) => (
              <Col className="col-12 mb-4" sm={6} xl={4} xxl={3} key={product.id}>
                <Card className="shadow">
                  <Card.Img variant="top" src={product.image} style={{ paddingInline: "20%", paddingTop: "20%" }} />
                  <Card.Body>
                    <Card.Title className="text-center fs-3 fw-semibold">{product.title}</Card.Title>
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
                    <Row>
                      <Col className="price fs-1 lead d-flex justify-content-end">{product.price} €</Col>
                    </Row>
                    {/* controllare se l'utente registrato sta navigando nella pagina per abilitare l'acquisto */}
                    {username ? (
                      <Row className="text-center mb-2">
                        <Col>
                          <Button className="btnBuyProduct mt-3 text-center" variant="primary">
                            SCEGLI E ACQUISTA
                          </Button>
                        </Col>{" "}
                      </Row>
                    ) : null}
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

export default HeatPump;
