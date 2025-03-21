import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import MyNavbar from "./MyNavbar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { allProductsBySearch } from "../redux/actions/allProductsActions";
import sadface from "../assets/images/sadface.svg";

const SearchProducts = () => {
  const dispatch = useDispatch();

  // riprendo il prodotto ricercato che è inserito come parametro nell'URL
  const params = useParams();
  const productSearch = params.product;

  const username = sessionStorage.getItem("username"); // variabile che controlla se l'utente ha credenziali per navigare nella pagina

  // al caricamento della pagina vengono mostrati tutti i prodotti
  useEffect(() => {
    dispatch(allProductsBySearch(productSearch));
  }, [productSearch]);

  const productsBySearch = useSelector((state) => state.allProducts.content);

  return (
    <>
      <MyNavbar />
      <Container fluid className="hero" style={{ marginTop: "100px", paddingTop: "100px", minHeight: "100vh" }}>
        <Row className="fs-1 mb-4 fw-bold text-center mt-3">
          <Col>
            {productsBySearch && productsBySearch.length > 0 ? (
              productsBySearch.length == 1 ? (
                `${productsBySearch.length} prodotto trovato`
              ) : (
                `${productsBySearch.length} prodotti trovati`
              )
            ) : (
              <>
                Nessun prodotto trovato
                <Row className="d-flex justify-content-center">
                  <Col className="col-4 mt-2 mb-3" md={3} xl={2}>
                    <Image fluid src={sadface}></Image>
                  </Col>
                </Row>
              </>
            )}
          </Col>
        </Row>
        {productsBySearch && productsBySearch.length > 0 ? (
          <>
            <Container>
              <Row>
                {productsBySearch.map((product) => (
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
                        {username && (
                          <Row className="text-center mb-2">
                            <Col>
                              <Link to={`/detailsProduct/${encodeURIComponent(username)}/${product.id}`} className="text-decoration-none" state={product}>
                                <Button className="btnBuyProduct mt-3 text-center" variant="primary">
                                  SCEGLI E ACQUISTA
                                </Button>
                              </Link>
                            </Col>
                          </Row>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Container>
          </>
        ) : null}
      </Container>
    </>
  );
};

export default SearchProducts;
