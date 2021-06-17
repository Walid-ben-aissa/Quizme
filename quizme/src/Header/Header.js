import Logo from "../Me.png";
import { Navbar, Row, Col, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <Row className="navbar">
      <Col xs={{ span: 3 }} sm={{ span: 4 }} lg={1}>
        <Link to="/">
          <img alt="" src={Logo} className="logo" />
        </Link>
      </Col>
      <Col xs={{ offset: 1 }}>
        <Navbar
          className="container-fluid justify-content-end"
          bg="light"
          variant="light"
          expand="lg"
        >
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="" id="basic-navbar-nav test">
            <Nav className="ml-auto">
              <Link to="/categories"> Leaderboards </Link>
              &nbsp;
            </Nav>
            <Nav className="ml-auto">
              <Link to="/compte" style={{ color: "" }}>
                Login
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Col>
    </Row>
  );
}

export default Header;
