import { useDispatch, useSelector } from "react-redux";
import MyNavbar from "./MyNavbar";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getUserQuotes } from "../redux/actions/quotesActions";
import { ChevronRight } from "react-bootstrap-icons";

const Quotes = () => {
  const dispatch = useDispatch();

  const params = useParams();
  const userId = params.userId; // recupero l'id dell'utente
  const username = sessionStorage.getItem("username"); // variabile che controlla se l'utente ha credenziali per navigare nella pagina

  const transactions = useSelector((state) => state.quotes.content); // variabile che contiene tutti gli acquisti dell'utente

  useEffect(() => {
    dispatch(getUserQuotes(userId));
  }, []);

  return (
    <>
      <MyNavbar quotesSelected={true} />
      <Container fluid className="hero" style={{ marginTop: "100px", paddingTop: "100px" }}>
        {transactions.length > 0 ? (
          <>
            <Row className="fs-1 mb-4 fw-bold text-center mt-3">
              <Col>I tuoi ordini:</Col>
            </Row>
            <Container>
              <Row>
                {transactions.map((transaction) => (
                  <Col className="col-12 mb-4 d-flex stretch" xl={6} key={transaction.id}>
                    <Card className="shadow" style={{ borderRadius: "0px" }}>
                      <Row>
                        <Col className="col-12 my-3 px-5" sm={6}>
                          {" "}
                          <Card.Img src={transaction.heater.image} style={{ borderRadius: "0px" }} />
                        </Col>
                        <Col>
                          <Card.Body>
                            <Card.Title className="fs-3 fw-semibold">{transaction.heater.title}</Card.Title>
                            <Card.Text className="lead mb-2" style={{ marginBlockEnd: "0px" }}>
                              {transaction.heater.description}
                            </Card.Text>

                            <Row>
                              <Col className="fs-6 lead d-flex">Acquistato il {transaction.transactionDate} </Col>
                            </Row>
                            <Row>
                              <Col className="fs-6 d-flex mt-3 justify-content-between align-items-center">
                                <Link
                                  to={`/detailsProduct/${encodeURIComponent(username)}/${transaction.heater.id}`}
                                  className="text-decoration-none"
                                  state={transaction.heater}
                                >
                                  <Button className="buyAgainBtn bg-transparent border-0 rounded-0 px-0">
                                    Compralo di nuovo
                                    <ChevronRight className="ms-2 text-dark" />
                                  </Button>
                                </Link>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Col>
                      </Row>
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
