import { useDispatch, useSelector } from "react-redux";
import { buyProduct, checkAvailability } from "../redux/actions/allProductsActions";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";
import MyNavbar from "./MyNavbar";
import { useEffect } from "react";

const DetailsProduct = () => {
  const dispatch = useDispatch();

  // controllo se il prodotto è disponibile in stock
  const isAvailable = useSelector((state) => state.allProducts.isAvailable);

  // acceddo allo state dell'oggetto location corrente
  const location = useLocation();
  const { username, heaterId } = useParams();

  // recupero lo state -> product
  const heater = location.state;

  const handleBuyBtn = () => {
    dispatch(buyProduct(username, heaterId));
  };

  useEffect(() => {
    dispatch(checkAvailability(true));
  }, []);

  return (
    <>
      <MyNavbar />
      <Container fluid className="hero" style={{ marginTop: "100px", paddingTop: "100px" }}>
        {isAvailable ? (
          <Container>
            {" "}
            <Row>
              <Col className="d-flex flex-column col-12" md={6} lg={4}>
                <Image fluid src={heater.image} />
                <Row className="my-3 g-0">
                  <Col className="col-2 px-0">
                    <Image fluid src={heater.firstIcon} style={{ maxHeight: "40px" }} />
                  </Col>
                  <Col className="col-2 px-0">
                    <Image fluid src={heater.secondIcon} style={{ maxHeight: "40px" }} />
                  </Col>
                  <Col className="col-2 px-0">
                    <Image fluid src={heater.thirdIcon} style={{ maxHeight: "40px" }} />
                  </Col>
                </Row>
              </Col>
              <Col className="d-flex flex-column justify-content-between">
                <Row>
                  <Col>
                    {" "}
                    <Row className="lead mb-3">
                      <Col>{heater.longDescription}</Col>
                    </Row>
                    <Row className="mb-2">
                      <Col className="text-secondary-emphasis">Tipologia:</Col>
                      <Col className="fw-semibold">{heater.title.toUpperCase()}</Col>
                    </Row>
                    <Row className="mb-2">
                      <Col className="text-secondary-emphasis">Specifiche:</Col>
                      <Col className="fw-semibold">{heater.description.toUpperCase()}</Col>
                    </Row>
                    <Row className="mb-2">
                      <Col className="text-secondary-emphasis">Potenza nominale:</Col>
                      <Col className="fw-semibold">{heater.power} KW</Col>
                    </Row>
                    <Row className="mb-2">
                      <Col className="text-secondary-emphasis">Classe energetica:</Col>
                      <Col className="fw-semibold">{heater.firstElementList.toUpperCase()}</Col>
                    </Row>
                    <Row className="mb-2">
                      <Col className="text-secondary-emphasis">Incentivi:</Col>
                      <Col className="fw-semibold">{heater.secondElementList.toUpperCase()}</Col>
                    </Row>
                    <Row className="mb-2">
                      <Col className="text-secondary-emphasis">Per ambiente da:</Col>
                      <Col className="fw-semibold">{heater.thirdElementList.toUpperCase()}</Col>
                    </Row>
                    <Row>
                      <Col className="price fs-1 lead d-flex mb-2">{heater.price} €</Col>
                    </Row>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col>
                    {" "}
                    <Row className="mt-auto">
                      <Col>
                        <Button
                          className="btnBuyProduct"
                          onClick={() => {
                            handleBuyBtn();
                          }}
                        >
                          COMPLETA L'ACQUISTO
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        ) : (
          <Row className="fs-1 mb-4 fw-bold text-center">
            <Col>Siamo spiacenti ma il prodotto è esaurito</Col>
          </Row>
        )}
      </Container>
    </>
  );
};

export default DetailsProduct;
