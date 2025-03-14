import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allPreventiveProducts } from "../redux/actions/allProductsActions";
import MyNavbar from "./MyNavbar";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const BuildingEvaluationPreventive = () => {
  const dispatch = useDispatch();

  const username = sessionStorage.getItem("username");

  // al caricamento della pagina vengono mostrati tutti i prodotti derivati da building evaluation
  useEffect(() => {
    dispatch(allPreventiveProducts(40));
  }, []);

  const preventiveProducts = useSelector((state) => state.allProducts.preventiveContent);

  return (
    <>
      <MyNavbar />
      <Container fluid className="hero" style={{ marginTop: "100px", paddingTop: "100px" }}>
        {/* Verificare se ci sono dei prodotti che rispondo alle esigenze di building evaluation */}
        {preventiveProducts.length > 0 ? (
          <>
            {" "}
            <Row className="fs-1 mb-4 fw-bold text-center">
              <Col>Ti suggeriamo uno dei seguenti prodotti:</Col>
            </Row>{" "}
            <Container>
              <Row>
                {preventiveProducts.map((product) => (
                  <Col className="col-12 mb-4 d-flex stretch" sm={6} xl={4} xxl={3} key={product.id}>
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
                              <Link to={`/detailsProduct/${encodeURIComponent(username)}/${product.id}`} className="text-decoration-none" state={{ product }}>
                                <Button className="btnBuyProduct mt-3 text-center" variant="primary">
                                  SCEGLI E ACQUISTA
                                </Button>
                              </Link>
                            </Col>{" "}
                          </Row>
                        ) : null}
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Container>
          </>
        ) : (
          <Row className="fs-1 mb-4 fw-bold text-center">
            <Col>Siamo spiacenti ma nessun prodotto corrisponde alla ricerca</Col>
          </Row>
        )}
      </Container>
    </>
  );
};

export default BuildingEvaluationPreventive;
