import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import MyNavbar from "./MyNavbar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { buildAllProductsPage } from "../redux/actions/allProductsActions";
import goRight from "../assets/images/goright.svg";
import goLeft from "../assets/images/goleft.svg";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const dispatch = useDispatch();

  let [page, setPage] = useState(0); // stato che controlla la paginazione

  const username = sessionStorage.getItem("username"); // variabile che controlla se l'utente ha credenziali per navigare nella pagina

  // al caricamento della pagina vengono mostrati tutti i prodotti
  useEffect(() => {
    dispatch(buildAllProductsPage(page, 12));
  }, [page]);

  const allProducts = useSelector((state) => state.allProducts.allProductsContent);

  const handleNextPage = () => {
    if (page < allProducts.totalPages - 1) {
      setPage((page += 1));
    }
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage((page -= 1));
    }
  };

  return (
    <>
      <MyNavbar />
      <Container fluid className="hero" style={{ marginTop: "100px", paddingTop: "100px" }}>
        {allProducts && allProducts.content && allProducts.content.length > 0 ? (
          <>
            <Row className="fs-1 mb-4 fw-bold text-center mt-3">
              <Col>Tutti i prodotti disponibili a catalogo</Col>
            </Row>
            <Container>
              <Row>
                {allProducts.content.map((product) => (
                  <Col className="col-12 mb-4 d-flex stretch justify-content-between" sm={6} xl={4} xxl={3} key={product.id}>
                    <Card className="shadow">
                      <Card.Img variant="top" src={product.image} style={{ paddingInline: "20%", paddingTop: "10%" }} />
                      <Card.Body>
                        <Card.Title className="text-center fs-3">{product.title}</Card.Title>
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
                          <Col className="price fw-bold fs-1 lead d-flex justify-content-end">{product.price} €</Col>
                        </Row>

                        {/* controllare se l'utente registrato sta navigando nella pagina per abilitare l'acquisto */}

                        <Row className="text-center mb-2">
                          <Col>
                            <Link to={`/detailsProduct/${encodeURIComponent(username)}/${product.id}`} className="text-decoration-none" state={product}>
                              <Button className="btnBuyProduct mt-3 text-center" variant="primary">
                                DETTAGLI
                              </Button>
                            </Link>
                          </Col>{" "}
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Container>
          </>
        ) : (
          <Row className="fs-1 mb-4 fw-bold text-center">
            <Col>Nessun prodotto trovato</Col>
          </Row>
        )}

        <Row className="text-center mt-5">
          {allProducts && allProducts.content && allProducts.content.length > 0 ? (
            <>
              <Col>
                <Button onClick={handlePreviousPage} className="btnPagination me-4 rounded-circle" style={{ width: "40px", height: "40px" }}>
                  <Image fluid src={goLeft} />
                </Button>
                {page + 1} di {allProducts.totalPages}
                <Button onClick={handleNextPage} className="btnPagination ms-4 rounded-circle" style={{ width: "40px", height: "40px" }}>
                  <Image fluid src={goRight} />
                </Button>
              </Col>
            </>
          ) : null}
        </Row>
      </Container>
    </>
  );
};

export default AllProducts;
