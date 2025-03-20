import { useDispatch, useSelector } from "react-redux";
import MyNavbar from "./MyNavbar";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getUserQuotes } from "../redux/actions/quotesActions";

const Quotes = () => {
  const dispatch = useDispatch();

  const params = useParams();
  const userId = params.userId;

  const username = sessionStorage.getItem("username"); // variabile che controlla se l'utente ha credenziali per navigare nella pagina
  const userQuotes = useSelector((state) => state.quotes.content); // variabile che contiene tutti gli acquisti dell'utente

  useEffect(() => {
    dispatch(getUserQuotes(userId));
  }, []);

  return (
    <>
      <MyNavbar quotesSelected={true} />
      <Container fluid className="hero" style={{ marginTop: "100px", paddingTop: "100px" }}>
        {userQuotes.length > 0 ? (
          <>
            <Row className="fs-1 mb-4 fw-bold text-center mt-3">
              <Col>Elenco dei preventivi da te richiesti</Col>
            </Row>
            <Container>
              <Row>
                {userQuotes.map((product) => (
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
            <Col>Nessun acquisto effettuato</Col>
          </Row>
        )}
      </Container>
    </>
  );
};

export default Quotes;
