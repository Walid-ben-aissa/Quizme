import { Row, Col } from "react-bootstrap";
import "./Footer.css";

function Footer() {
  return (
    <Row id="footer" rounded="true">
      <Col lg={{ span: 8, offset: 2 }}>
        This website was created by Walid Ben Aïssa, a student in ISTIC as an
        end of the year project for the year 2020 <br />
        <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">
          <img
            alt="Creative Commons License"
            style={{ borderWidth: 0 }}
            src="https://i.creativecommons.org/l/by-sa/4.0/80x15.png"
          />
        </a>
        <br />
        This work is licensed under a{" "}
        <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">
          Creative Commons Attribution-ShareAlike 4.0 International License
        </a>
        <br />
        Powered by React
      </Col>
    </Row>
  );
}
export default Footer;
