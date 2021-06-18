import Logo from "../Me.png";
import { Navbar, Row, Col, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <Row id="navbar">
      <Col xs={{ span: 3 }} sm={{ span: 3 }} lg={1}>
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
          <Navbar.Collapse
            style={{ textAlign: "center" }}
            className=""
            id="basic-navbar-nav test"
          >
            <Nav className="ml-auto">
              <Link to="/categories" id="link">
                &nbsp;Leaderboards&nbsp;
              </Link>
              &nbsp;
            </Nav>
            <Nav className="">
              <Link to="/compte" id="link">
                &nbsp;Login&nbsp;
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Col>
    </Row>
  );
}

export default Header;
