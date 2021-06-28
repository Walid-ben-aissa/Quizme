import React from "react";
import { Row, Col } from "react-bootstrap";
import { Form, Button } from "react-bootstrap";
import { Redirect } from "react-router";
import "./signup.css";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activated: 1, redirect: false };
  }
  handleclick = (id) => {
    this.setState({ activated: id });
  };
  handleinput = (e) => {
    const target = e.target;
    const value = target.value;
    const id = target.id;
    console.log(target, value, id);
    this.setState({ [id]: value });
  };
  handlesubmit = (e) => {
    e.preventDefault();
    if (this.state.password === this.state.cnfpassword) {
      let body = `{"name":"${this.state.name}","surname":"${this.state.surname}","mail":"${this.state.mail}","pass":"${this.state.password}"}`;
      fetch("http://127.0.0.1:8000/createacc", {
        method: "POST",
        body: body,
      }).then((rep) => {
        rep.json().then((data) => {
          console.log(data);
          if (data === "Success") this.setState({ redirect: true });
          else alert("An account with that email already exists!");
        });
      });
    } else alert("Passwords do not match");
  };
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
            lg={{ offset: 2, span: 8 }}
            xs={{ offset: 1, span: 10 }}
          >
            <h1 className="title text-dark" style={{ fontSize: "400%" }}>
              Create an account
            </h1>
            <br />
            <Form onSubmit={this.handlesubmit}>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  id="name"
                  required
                  onChange={this.handleinput}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Surname</Form.Label>
                <Form.Control
                  type="text"
                  id="surname"
                  required
                  onChange={this.handleinput}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>E-mail adress</Form.Label>
                <Form.Control
                  type="email"
                  id="mail"
                  required
                  onChange={this.handleinput}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  id="password"
                  required
                  onChange={this.handleinput}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  id="cnfpassword"
                  required
                  onChange={this.handleinput}
                />
              </Form.Group>
              <br />
              <div id="sub">
                <Button variant="danger" type="submit">
                  Create account
                </Button>
              </div>
            </Form>
            <br />
          </Col>
        </Row>
        <br />
        <br />
        {this.state.redirect && <Redirect to="/" />}
      </div>
    );
  }
}

export default Signup;
