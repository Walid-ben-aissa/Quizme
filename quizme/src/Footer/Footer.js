import { Row, Col } from "react-bootstrap";
import "./Footer.css";

function Footer() {
  return (
    <Row id="footer" rounded="true">
      <Col lg={{ offset: 1, span: 4 }}>Powered by React</Col>
      <Col lg={5}>
        Ce site a été crée par Walid Ben Aïssa, un etudiant de L’Institut
        Supérieur des Technologies de l’Information et de la Communication comme
        projét de fin d'anné
      </Col>
    </Row>
  );
}
export default Footer;
