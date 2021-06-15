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

function ToggleButtonExample(props) {
  const [radioValue, setRadioValue] = useState("1");

  const radios = [
    { name: { img1 }, value: "1" },
    { name: { img2 }, value: "2" },
    { name: { img3 }, value: "3" },
    { name: { img4 }, value: "4" },
    { name: { img5 }, value: "5" },
    { name: { img6 }, value: "6" },
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
                variant="light"
                name="radio"
                value={radio.value}
                checked={radioValue === radio.value}
                onChange={(e) => {
                  setRadioValue(e.currentTarget.value);
                  props.callback(radioValue);
                }}
              >
                <img src={Object.values(radio.name)} alt="av" className="img" />
              </ToggleButton>
            ))}
          </ButtonGroup>
        </Col>
      </Row>
      <br />
    </>
  );
}

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activated: 0 };
  }
  handleclick = (id) => {
    this.setState({ activated: id });
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

            <Form>
              Choisir un avatar:
              <ToggleButtonExample callback={this.handleclick} />
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
              <Form.Group controlId="formBasicPasswordConf">
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
