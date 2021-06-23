import React from "react";
import ReactDOM from "react-dom";
import "./Topic.css";
import { Card, Button, Col, Row, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
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
      </div>,
      document.getElementById("bod")
    );
  };
  componentDidMount() {
    if (sessionStorage["mail"] !== undefined) {
      let id = window.location.pathname.slice(
        window.location.pathname.indexOf("/", 1) + 1
      );
      timer.start(20000);
      ReactDOM.render(
        <>
          <Row>
            <Col lg={3} xs={12}>
              Score: {this.state.score}
            </Col>
            <Col lg={{ span: 2, offset: 10 }}>
              Time: {Math.round(timer.time / 1000)}
            </Col>
          </Row>
        </>,
        document.getElementById("time")
      );
      timer.stop();
      console.log(id);
      fetch(
        "https://opentdb.com/api.php?amount=8&difficulty=easy&category=" +
          id +
          "&token=" +
          sessionStorage["token"]
      )
        .then((response) => response.json())
        .then((data) => {
          if (data["response_code"] === 0) {
            this.setState({
              x: data["results"],
              y: data["results"][0]["category"],
            });
          } else if (data["response_code"] === 4)
            fetch(
              "https://opentdb.com/api_token.php?command=reset&token=" +
                sessionStorage["token"]
            ).then((response) => {
              response.json().then((data) => {
                sessionStorage["token"] = data["token"];
              });
              window.location.reload();
            });
          console.log(data);
        });
    }
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
  componentWillUnmount() {
    timer.stop();
  }
  test = () => {
    if (this.state.f < 8) {
      let slide = this.state.x[this.state.f];
      let quest = decode(slide["question"]);
      let canswers;
      let incanswers;
      let x = 0;
      canswers = unescape(decode(slide["correct_answer"]));
      incanswers = slide["incorrect_answers"].map((word) => decode(word));
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
      timer.start(20000);
      ReactDOM.render(<>{buttons}</>, document.getElementById("content"));
      timer.on("tick", () => {
        x = timer.time;
        ReactDOM.render(
          <>
            <Row>
              <Col lg={3} xs={12}>
                Score: {this.state.score}
              </Col>
              <Col lg={{ span: 2, offset: 10 }}>
                Time: {Math.round(timer.time / 1000)}
              </Col>
            </Row>
          </>,
          document.getElementById("time")
        );
      });
    } else {
      this.setState({ complete: true });
      ReactDOM.render(
        <div id="success">
          Your score is {this.state.score}
          <br />
        </div>,
        document.getElementById("bod")
      );
      console.log(this.state.score);
    }
  };

  render() {
    return (
      <>
        {sessionStorage["mail"] !== undefined && (
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
              {this.state.complete && (
                <Button
                  variant="secondary"
                  style={{ width: "100%" }}
                  onClick={() => {
                    window.location.reload(true);
                  }}
                >
                  Play again?
                </Button>
              )}

              {this.state.done && (
                <Button
                  id="nextB"
                  style={{ width: "100%" }}
                  onClick={this.reset}
                  variant="success"
                >
                  Next
                </Button>
              )}
            </Card.Footer>
          </Card>
        )}
        {sessionStorage["mail"] === undefined && (
          <>
            <br />
            <Card id="notlog">
              You must be signed in to take a quiz!
              <Nav className="">
                <Link to="/signup" className="btn" id="link">
                  &nbsp;Signup&nbsp;
                </Link>
              </Nav>
            </Card>

            <br />
          </>
        )}
      </>
    );
  }
}

export default Topic;
