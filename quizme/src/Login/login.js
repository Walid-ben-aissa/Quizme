import { Row, Col } from "react-bootstrap";
import React from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import "./login.css";

class Login extends React.Component {
  select(e) {
    console.log(e);
  }
  render() {
    return (
      <div id="mainlog">
        <Row>
          <Col
            className="rounded"
            style={{ backgroundColor: "#f8f9fa" }}
            lg={{ offset: 3, span: 6 }}
            xs={{ offset: 2, span: 8 }}
          >
            <h1 className="title text-dark" style={{ fontSize: "500%" }}>
              Login
            </h1>
            <br />
            <Form id="form">
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Adresse E-Mail</Form.Label>
                <Col xs={{ span: 6, offset: 3 }}>
                  <Form.Control className="inp" type="email" />
                </Col>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Mot de passe</Form.Label>
                <Col xs={{ span: 6, offset: 3 }}>
                  <Form.Control className="inp" type="password" />
                </Col>
              </Form.Group>
              <Button variant="danger" type="submit">
                Se connecter
              </Button>
              <br />
              <br />
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Login;
