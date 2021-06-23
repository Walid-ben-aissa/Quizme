import React from "react";
import { Row, Col } from "react-bootstrap";
import { Form, Button } from "react-bootstrap";
import img1 from "./avatar1.png";
import img4 from "./avatar2.png";
import img3 from "./avatar3.png";
import img2 from "./avatar4.png";
import img5 from "./avatar5.png";
import img6 from "./avatar6.png";
import ToggleButton from "react-bootstrap/ToggleButton";
import { ButtonGroup } from "react-bootstrap";
import { useState } from "react";
import { Redirect } from "react-router";
import "./signup.css";

function ToggleButtonExample(props) {
  const [radioValue, setRadioValue] = useState("1");

  const radios = [
    { img: { img1 }, value: "1" },
    { img: { img2 }, value: "2" },
    { img: { img3 }, value: "3" },
    { img: { img4 }, value: "4" },
    { img: { img5 }, value: "5" },
    { img: { img6 }, value: "6" },
  ];
  return (
    <>
      <br />
      <Row>
        <ButtonGroup className="mb-2">
          {radios.map((radio, idx) => (
            <Col>
              <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant="light"
                name="radio"
                value={radio.value}
                checked={radioValue === radio.value}
                onChange={(e) => {
                  setRadioValue(e.currentTarget.value);
                  props.callback(e.currentTarget.value);
                }}
              >
                <img src={Object.values(radio.img)} alt="av" className="img" />
              </ToggleButton>
            </Col>
          ))}
        </ButtonGroup>
      </Row>
      <br />
    </>
  );
}

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
    let body = `{"name":"${this.state.name}","surname":"${this.state.surname}","mail":"${this.state.mail}","pass":"${this.state.password}","avatar":${this.state.activated}}`;
    fetch("http://127.0.0.1:8000/createacc", {
      method: "POST",
      body: body,
    }).then((rep) => {
      rep.json().then((data) => {
        console.log(data);
        this.setState({ redirect: true });
      });
    });
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
              Choose an Avatar:
              <ToggleButtonExample callback={this.handleclick} />
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
