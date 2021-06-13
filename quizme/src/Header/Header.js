import Logo from "../Me.png";
import { Navbar, Row, Col, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <div>
      <Navbar bg="light" variant="light" expand="lg">
        <Row>
          <Col
            xs={{ span: 3, offset: 2 }}
            sm={{ span: 4, offset: 2 }}
            lg={{ span: 2, offset: 2 }}
          >
            <Link to="/">
              <img alt="" src={Logo} className="logo" />
            </Link>
          </Col>
          <Col lg={{ offset: 5 }}>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Link to="/categories">
                  <br />
                  <br />
                  Leaderboards
                </Link>
              </Nav>
            </Navbar.Collapse>
          </Col>
        </Row>
      </Navbar>
    </div>
  );
}

export default Header;
