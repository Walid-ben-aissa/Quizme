import Logo from "../Me.png";
import { Navbar, Row, Col, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import "./Header.css";

function Header(props) {
  useEffect(() => {
    console.log(props.log);
  });
  console.log("hey");
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
              <Link to="/leaderboards" className="btn" id="link">
                &nbsp;Leaderboard&nbsp;
              </Link>
              &nbsp;
            </Nav>
            <Nav className="">
              <Link to="/" className="btn" id="link">
                &nbsp;Categories&nbsp;
              </Link>
              &nbsp;
            </Nav>

            {!props.log && (
              <>
                <Nav className="">
                  <Link to="/signin" className="btn" id="link">
                    &nbsp;SignIn&nbsp;
                  </Link>
                  &nbsp;
                </Nav>
                <Nav className="">
                  <Link to="/signup" className="btn" id="link">
                    &nbsp;Signup&nbsp;
                  </Link>
                </Nav>
              </>
            )}
            {props.log && (
              <>
                <Nav
                  id="link"
                  className="btn"
                  onClick={() => {
                    sessionStorage.clear();
                    props.call(false);
                  }}
                >
                  <Link
                    to="/"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    &nbsp; Log out&nbsp;
                  </Link>
                </Nav>
                <h5 id="loggedin">
                  logged in as
                  <br />
                  {sessionStorage["name"] + " " + sessionStorage["surname"]}
                </h5>
              </>
            )}
            {sessionStorage["id"] === "0" && (
              <>
                &nbsp;
                <Nav id="link" className="btn">
                  <Link
                    to="/admin"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    &nbsp; Admin&nbsp;
                  </Link>
                </Nav>
              </>
            )}
          </Navbar.Collapse>
        </Navbar>
      </Col>
    </Row>
  );
}

export default Header;
