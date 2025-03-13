import { useDispatch } from "react-redux";
import { buyProduct } from "../redux/actions/allProductsActions";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";
import MyNavbar from "./MyNavbar";

const DetailsProduct = () => {
  const dispatch = useDispatch();

  // acceddo allo state dell'oggetto location corrente
  const location = useLocation();
  const { username, heaterId } = useParams();

  // recupero lo state -> product
  const heater = location.state;

  const handleBuyBtn = () => {
    dispatch(buyProduct(username, heaterId));
  };

  return (
    <>
      <MyNavbar />
      <Container fluid className="hero" style={{ marginTop: "100px", paddingTop: "100px" }}>
        <Container>
          {" "}
          <Row>
            <Col className="d-flex flex-column col-12" md={6} lg={4}>
              <Image fluid src={heater.product.image} />
              <Row className="my-3 g-0">
                <Col className="col-2 px-0">
                  <Image fluid src={heater.product.firstIcon} style={{ maxHeight: "40px" }} />
                </Col>
                <Col className="col-2 px-0">
                  <Image fluid src={heater.product.secondIcon} style={{ maxHeight: "40px" }} />
                </Col>
                <Col className="col-2 px-0">
                  <Image fluid src={heater.product.thirdIcon} style={{ maxHeight: "40px" }} />
                </Col>
              </Row>
            </Col>
            <Col className="d-flex flex-column justify-content-between">
              <Row>
                <Col>
                  {" "}
                  <Row className="lead mb-3">
                    <Col>{heater.product.longDescription}</Col>
                  </Row>
                  <Row className="mb-2">
                    <Col className="text-secondary-emphasis">Tipologia:</Col>
                    <Col className="fw-semibold">{heater.product.title.toUpperCase()}</Col>
                  </Row>
                  <Row className="mb-2">
                    <Col className="text-secondary-emphasis">Specifiche:</Col>
                    <Col className="fw-semibold">{heater.product.description.toUpperCase()}</Col>
                  </Row>
                  <Row className="mb-2">
                    <Col className="text-secondary-emphasis">Potenza nominale:</Col>
                    <Col className="fw-semibold">{heater.product.power} KW</Col>
                  </Row>
                  <Row className="mb-2">
                    <Col className="text-secondary-emphasis">Classe energetica:</Col>
                    <Col className="fw-semibold">{heater.product.firstElementList.toUpperCase()}</Col>
                  </Row>
                  <Row className="mb-2">
                    <Col className="text-secondary-emphasis">Incentivi:</Col>
                    <Col className="fw-semibold">{heater.product.secondElementList.toUpperCase()}</Col>
                  </Row>
                  <Row className="mb-2">
                    <Col className="text-secondary-emphasis">Per ambiente da:</Col>
                    <Col className="fw-semibold">{heater.product.thirdElementList.toUpperCase()}</Col>
                  </Row>
                  <Row>
                    <Col className="price fs-1 lead d-flex mb-2">{heater.product.price} €</Col>
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
      </Container>
    </>
  );
};

export default DetailsProduct;
