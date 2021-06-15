import { Row, Col } from "react-bootstrap";
import React from "react";
import { Button } from "react-bootstrap";
import "./compte.css";

class Compte extends React.Component {
  render() {
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
            <form id="form">
              <label>
                Email:
                <br />
                <input type="text" name="name" />
              </label>
              <br />
              <label>
                Mot de passe:
                <br />
                <input type="text" name="name" />
              </label>
              <br />
              <br />
              <br />
              <Button as="input" id="btn" type="submit" value="Se connecter" />
            </form>
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
export default Compte;
