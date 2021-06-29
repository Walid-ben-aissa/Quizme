import React from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { Redirect } from "react-router";
import "./Signin.css";

class Signin extends React.Component {
  redirect = () => {};
  constructor(props) {
    super(props);
    this.state = { redirect: false };
  }
  componentWillUnmount = () => {
    window.location.reload();
  };
  handlesubmit = (e) => {
    e.preventDefault();
    let body = `{"mail":"${this.state.mail}","pass":"${this.state.pass}"}`;
    fetch("http://127.0.0.1:8000/signin", {
      method: "POST",
      body: body,
    }).then((rep) => {
      rep.json().then((data) => {
        if (data !== "Failed") {
          sessionStorage["name"] = data[0]["name"];
          sessionStorage["surname"] = data[0]["surname"];
          sessionStorage["mail"] = data[0]["email"];
          sessionStorage["avatar"] = data[0]["avatar"];
          sessionStorage["id"] = data[0]["id_account"];
          fetch("https://opentdb.com/api_token.php?command=request").then(
            (response) => {
              response.json().then((data) => {
                sessionStorage["token"] = data["token"];
              });
              this.setState({ redirect: true });
            }
          );
        } else {
          alert("Incorrect mail or password");
        }
      });
    });
  };
  handleinput = (e) => {
    const target = e.target;
    const value = target.value;
    const id = target.id;
    console.log(target, value, id);
    this.setState({ [id]: value });
    console.log(this.state);
  };
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
            <h1 className="title text-dark" style={{ fontSize: "400%" }}>
              Sign In
            </h1>
            <br />
            <Form id="form" onSubmit={this.handlesubmit}>
              <Form.Group controlId="mail">
                <Form.Label>E-mail Adress</Form.Label>
                <Col xs={{ span: 8, offset: 2 }}>
                  <Form.Control
                    className="inp"
                    type="email"
                    onChange={this.handleinput}
                  />
                </Col>
              </Form.Group>
              <Form.Group controlId="pass">
                <Form.Label>Password</Form.Label>
                <Col xs={{ span: 8, offset: 2 }}>
                  <Form.Control
                    className="inp"
                    type="password"
                    onChange={this.handleinput}
                  />
                </Col>
              </Form.Group>
              <Button variant="danger" type="submit">
                Connect
              </Button>
              <br />
              <br />
            </Form>
          </Col>
        </Row>
        {this.state.redirect && <Redirect to="/" />}
      </div>
    );
  }
}
export default Signin;
