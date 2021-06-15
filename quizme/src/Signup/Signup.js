import React from "react";
import { Row, Col } from "react-bootstrap";
import { Form, Button } from "react-bootstrap";
import img1 from "./avatar1.png";
import img2 from "./avatar2.png";
import img3 from "./avatar3.png";
import img4 from "./avatar4.png";
import img5 from "./avatar5.png";
import img6 from "./avatar6.png";
import ToggleButton from "react-bootstrap/ToggleButton";
import { ButtonGroup } from "react-bootstrap";
import { useEffect, useState } from "react";

function ToggleButtonExample() {
  const [radioValue, setRadioValue] = useState("1");

  const radios = [
    { name: "Radio", value: "1" },
    { name: "Radio", value: "2" },
    { name: "Radio", value: "3" },
    { name: "Radio", value: "4" },
    { name: "Radio", value: "5" },
    { name: "Radio", value: "6" },
  ];

  return (
    <>
      <br />
      <Row>
        <Col>
          <ButtonGroup className="mb-2">
            {radios.map((radio, idx) => (
              <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant="secondary"
                name="radio"
                value={radio.value}
                checked={radioValue === radio.value}
                onChange={(e) => setRadioValue(e.currentTarget.value)}
              >
                <img src={img1} alt="av" className="img" />
              </ToggleButton>
            ))}
          </ButtonGroup>
        </Col>
      </Row>
      <br />
    </>
  );
}

class Avatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      active: this.props.active === this.props.id,
    };
    console.log(this.props.active === this.props.id);
  }
  select = () => {
    this.setState({ active: !this.state.active });
    this.props.callback(this.state.id);
  };

  render() {
    return (
      <Button
        as="img"
        variant="light"
        src={this.props.img}
        className="img"
        alt="av"
        onClick={this.select}
        active={this.state.active}
      />
    );
  }
}
class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activated: 5 };
  }
  handleclick = (id) => {
    this.setState({ activated: id });
    console.log(this.state.activated);
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
            xs={{ offset: 2, span: 8 }}
          >
            <h1 className="title text-dark" style={{ fontSize: "500%" }}>
              Créer un compte
            </h1>
            <br />
            <ToggleButtonExample />
            <Form>
              Choisir un avatar:
              <Row>
                <Col>
                  <Avatar
                    img={img1}
                    id={1}
                    callback={this.handleclick}
                    active={this.state.activated}
                  />
                </Col>
                <Col>
                  <Avatar
                    img={img3}
                    id={2}
                    callback={this.handleclick}
                    active={this.state.activated}
                  />
                </Col>
                <Col>
                  <Avatar
                    img={img4}
                    id={3}
                    callback={this.handleclick}
                    active={this.state.activated}
                  />
                </Col>
                <Col>
                  <Avatar
                    img={img2}
                    id={4}
                    callback={this.handleclick}
                    active={this.state.activated}
                  />
                </Col>
                <Col>
                  <Avatar
                    img={img5}
                    id={5}
                    callback={this.handleclick}
                    active={this.state.activated}
                  />
                </Col>
                <Col>
                  <Avatar
                    img={img6}
                    id={6}
                    callback={this.handleclick}
                    active={this.state.activated}
                  />
                </Col>
              </Row>
              <Form.Group>
                <Form.Label>Nom</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Prenom</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Adresse E-Mail</Form.Label>
                <Form.Control type="email" />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control type="password" />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Confirmer mot de passe</Form.Label>
                <Form.Control type="password" />
              </Form.Group>
              <br />
              <div id="sub">
                <Button variant="danger" type="submit">
                  Créer un compte
                </Button>
              </div>
            </Form>
            <br />
          </Col>
        </Row>
        <br />
        <br />
      </div>
    );
  }
}

export default Signup;
