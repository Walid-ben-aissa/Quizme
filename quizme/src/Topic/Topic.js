import React from "react";
import "./Topic.css";
import { Card, Button } from "react-bootstrap";

class Topic extends React.Component {
  constructor(props) {
    super(props);
    this.state = { x: 0, y: "", z: "", f: 0 };
  }

  componentDidMount() {
    let id = window.location.pathname.slice(
      window.location.pathname.indexOf("/", 1) + 1
    );
    console.log(id);
    fetch("https://opentdb.com/api.php?amount=8&category=" + id)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          x: data["results"],
          y: data["results"][0]["category"],
        });
        console.log(this.state.x);
      });
  }
  test = () => {
    if (this.state.f < 8) {
      let slide = this.state.x[this.state.f];
      let quest = slide["question"];
      let canswers;
      let incanswers;
      if (slide["type"] === "multiple") {
        canswers = slide["correct_answer"];
        incanswers = slide["incorrect_answers"];
      }
      let body =
        `{ "req": "` +
        quest +
        `","correct": "` +
        canswers +
        `","incorrect": "` +
        incanswers +
        `" }`;
      fetch("http://127.0.0.1:8000/translate", { method: "POST", body: body })
        .then((response) => response.json())
        .then((data) => console.log(data));
      this.setState({ f: this.state.f + 1 });
      console.log(quest);
      console.log(body);
    }
  };
  render() {
    return (
      <Card id="question" border="secondary">
        <Card.Header>{this.state.y}</Card.Header>
        <Card.Body>
          <Card.Title>{}</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
            <Button onClick={this.test}> Test </Button>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default Topic;
