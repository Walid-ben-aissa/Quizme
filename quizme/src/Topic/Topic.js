import React from "react";
import "./Topic.css";
import { Card } from "react-bootstrap";

class Topic extends React.Component {
  constructor(props) {
    super(props);
    this.state = { x: 0, y: "" };
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
        console.log(this.state.x[0]);
      });
  }
  render() {
    return (
      <Card id="question" border="secondary">
        <Card.Header>{this.state.y}</Card.Header>
        <Card.Body>
          <Card.Title>{}</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default Topic;
