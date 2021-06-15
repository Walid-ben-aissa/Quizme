import { Row, Col } from "react-bootstrap";
import React from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import "./log&sig.css";

class Authentificateur extends React.Component {
  render() {
    if (this.props.login)
      return (
        <div>
          <br />
          <br />
          <br />
          <br />
          <Row>
            <Col
              className="rounded"
              style={{ backgroundColor: "#f8f9fa" }}
              lg={{ offset: 3, span: 6 }}
              xs={{ offset: 2, span: 8 }}
            >
              <h1 className="title display-1 text-dark">Login</h1>
              <br />
              <Form id="form">
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Adresse Mail</Form.Label>
                  <Form.Control type="email" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Mot de passe</Form.Label>
                  <Form.Control type="password" />
                </Form.Group>
                <Button variant="danger" type="submit">
                  Se connecter
                </Button>
              </Form>
              <br />
              <br />
            </Col>
          </Row>
          <br />
          <br />
        </div>
      );
    else
      return (
        <div>
          <br />
          <br />
          <br />
          <br />
          <Row>
            <Col
              className="rounded"
              style={{ backgroundColor: "#f8f9fa" }}
              xs={{ offset: 2, span: 8 }}
            >
              <h1 className="title display-1 text-dark">Créer un compte</h1>
              <br />
              <Form>
                <Form.Group>
                  <Form.Label>Nom</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Prenom</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Adresse Mail</Form.Label>
                  <Form.Control type="email" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Mot de passe</Form.Label>
                  <Form.Control type="password" />
                </Form.Group>
                <Button variant="danger" type="submit">
                  Se connecter
                </Button>
              </Form>
              <br />
              <br />
            </Col>
          </Row>
          <br />
          <br />
        </div>
      );
  }
}
export default Authentificateur;
