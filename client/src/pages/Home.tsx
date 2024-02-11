import homeImg from "/computer2.png";
import "./Home.css";
import { Col, Container, Image, Row } from "react-bootstrap";

export default function Home() {
  return (
    <Container fluid className="mt-5">
      <Row>
        <Col sm={6} md={6}>
          <Image src={homeImg} alt="Goku Image" fluid />
        </Col>
        <Col
          sm={6}
          md={6}
          className="d-flex justify-content-center align-items-center"
        >
          <h1 className="fw-bolder text-dark hero-text px-2">
            Become a best version of yourself.
          </h1>
        </Col>
      </Row>
    </Container>
  );
}
