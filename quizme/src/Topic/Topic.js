import React from "react";
import ReactDOM from "react-dom";
import "./Topic.css";
import { Card, Button } from "react-bootstrap";

function decode(html) {
  let txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}
function shuffle(array) {
  var currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}
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
      let quest = decode(slide["question"]);
      let canswers;
      let incanswers;
      canswers = unescape(decode(slide["correct_answer"]));
      incanswers = slide["incorrect_answers"].map((word) => decode(word));
      /* let body =`{"req": "` + quest + `","correct": "` + canswers +`","incorrect": "` + incanswers + `" }`;
    fetch("http://127.0.0.1:8000/translate", {
      method: "POST",
      body: body,
    })
      .then((response) => response.json())
      .then((data) => console.log(data));*/
      let buttons = [
        <Button variant="danger" className="answers">
          {canswers}
        </Button>,
        <Button variant="danger" className="answers">
          {incanswers[0]}
        </Button>,
        <Button variant="danger" className="answers">
          {incanswers[1]}
        </Button>,
        <Button variant="danger" className="answers">
          {incanswers[2]}
        </Button>,
      ];
      buttons = shuffle(buttons);
      this.setState({ f: this.state.f + 1 });
      document.getElementById("title").innerHTML = quest;
      ReactDOM.render(<>{buttons}</>, document.getElementById("content"));
    } else alert("that's all folks");
  };
  render() {
    return (
      <>
        <Button onClick={this.test}> Test </Button>
        <Card id="question" border="secondary">
          <Card.Header>{this.state.y}</Card.Header>
          <Card.Body>
            <Card.Title id="title">{}</Card.Title>
            <Card.Text id="content"></Card.Text>
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default Topic;
