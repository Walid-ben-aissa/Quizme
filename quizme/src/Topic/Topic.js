import React from "react";
import ReactDOM from "react-dom";
import "./Topic.css";
import { Card, Button, Col, Row } from "react-bootstrap";
import Timer from "tiny-timer";
const timer = new Timer();

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
    this.state = {
      x: 0,
      y: "",
      z: 0,
      f: 0,
      done: false,
      complete: false,
      score: 0,
      type: "",
    };
  }
  handlechange = () => {
    ReactDOM.render(
      <div id="erreur" style={{ textAlign: "center" }}>
        Le temps a ecoulé <br />
        <Button
          variant="secondary"
          onClick={() => {
            window.location.reload(true);
          }}
        >
          Reéssayer?
        </Button>
      </div>,
      document.getElementById("bod")
    );
  };
  componentDidMount() {
    let id = window.location.pathname.slice(
      window.location.pathname.indexOf("/", 1) + 1
    );
    timer.start(20000);
    ReactDOM.render(
      <>
        <Row>
          <Col lg={3} xs={12}>
            Score :{this.state.score}
          </Col>
          <Col lg={{ span: 1, offset: 11 }}>
            {Math.round(timer.time / 1000)}
          </Col>
        </Row>
      </>,
      document.getElementById("time")
    );
    timer.stop();
    console.log(id);
    fetch("https://opentdb.com/api.php?amount=8&difficulty=easy&category=" + id)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          x: data["results"],
          y: data["results"][0]["category"],
        });
        console.log(this.state.x);
      });
  }
  reset = (typ) => {
    if (this.state.done) {
      document.getElementById("correct").style.backgroundColor = "#6c757d";
      document.getElementById("incorrect1").style.backgroundColor = "#6c757d";
      if (this.state.type === "multiple") {
        document.getElementById("incorrect2").style.backgroundColor = "#6c757d";
        document.getElementById("incorrect3").style.backgroundColor = "#6c757d";
      }
      this.setState({ done: false });
      this.test();
    }
  };
  verify = (id, typ, x) => {
    console.log("x ", Math.round(x / 10));
    console.log("Score :", this.state.score, id);
    timer.stop();
    console.log(timer.time);
    if (!this.state.done) {
      document.getElementById("correct").style.backgroundColor = "green";
      document.getElementById("incorrect1").style.backgroundColor = "red";
      if (typ === "multiple") {
        document.getElementById("incorrect2").style.backgroundColor = "red";
        document.getElementById("incorrect3").style.backgroundColor = "red";
      }
      document.getElementById("nextB").style.display = "inline";
      this.setState({
        done: true,
        type: typ,
      });
      if (id === "correct") {
        this.setState({
          score: this.state.score + Math.round(x / 10),
        });
      }
    }
  };
  test = () => {
    if (this.state.f < 8) {
      let slide = this.state.x[this.state.f];
      let quest = decode(slide["question"]);
      let canswers;
      let incanswers;
      let x = 0;
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
        <Button
          id="correct"
          onClick={() => this.verify("correct", slide["type"], x)}
          variant="secondary"
          className="answers"
        >
          {canswers}
        </Button>,
        <Button
          id="incorrect1"
          onClick={() => this.verify("incorrect", slide["type"], x)}
          variant="secondary"
          className="answers"
        >
          {incanswers[0]}
        </Button>,
      ];
      if (slide["type"] === "multiple") {
        buttons.push(
          <Button
            id="incorrect2"
            onClick={() => this.verify("incorrect", slide["type"], x)}
            variant="secondary"
            className="answers"
          >
            {incanswers[1]}
          </Button>,
          <Button
            id="incorrect3"
            onClick={() => this.verify("incorrect", slide["type"], x)}
            variant="secondary"
            className="answers"
          >
            {incanswers[2]}
          </Button>
        );
      }
      timer.on("done", () => this.verify("", slide["type"]));
      buttons = shuffle(buttons);
      this.setState({ f: this.state.f + 1 });
      document.getElementById("title").innerHTML = quest;
      document.getElementById("nextB").style.display = "none";
      timer.start(20000);
      ReactDOM.render(<>{buttons}</>, document.getElementById("content"));
      timer.on("tick", () => {
        x = timer.time;
        ReactDOM.render(
          <>
            <Row>
              <Col lg={3} xs={12}>
                Score :{this.state.score}
              </Col>
              <Col lg={{ span: 1, offset: 11 }}>
                {Math.round(timer.time / 1000)}
              </Col>
            </Row>
          </>,
          document.getElementById("time")
        );
      });
    } else {
      this.setState({ complete: true });
      ReactDOM.render(
        <div id="success">Your score is {this.state.score}</div>,
        document.getElementById("bod")
      );
      console.log(this.state.score);
    }
  };
  render() {
    return (
      <>
        <Card id="question" border="secondary">
          <Card.Header>{this.state.y}</Card.Header>
          <Card.Body id="bod">
            <Card.Title id="time"></Card.Title>
            <Col>
              <Card.Title id="title"></Card.Title>
            </Col>
            <Card.Text id="content">
              <Button
                id="start"
                onClick={this.test}
                variant="success"
                style={{ width: "75%" }}
              >
                Start
              </Button>
            </Card.Text>
          </Card.Body>
          <Card.Footer id="next">
            <Button
              id="nextB"
              style={{ width: "100%", display: "none" }}
              onClick={this.reset}
              variant="success"
            >
              Next
            </Button>
          </Card.Footer>
        </Card>
      </>
    );
  }
}

export default Topic;
