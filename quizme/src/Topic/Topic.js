import React from "react";
import ReactDOM from "react-dom";
import "./Topic.css";
import { Card, Button } from "react-bootstrap";
import Timer from "react-compound-timer";

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
      count: 0,
      score: 0,
      type: "",
    };
  }
  handlechange = (x) => {
    this.setState({ z: (x / 1000).toFixed(2) });
    console.log(Math.trunc(x / 1000));
    if (Math.trunc(x / 1000) < 0.00001 && !this.state.complete) {
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
    }
  };
  componentDidMount() {
    let id = window.location.pathname.slice(
      window.location.pathname.indexOf("/", 1) + 1
    );
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
      console.log("aa");
      this.test();
    }
  };
  verify = (id, typ) => {
    console.log(this.state.score, id);
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
      if (id === "correct")
        this.setState({
          score: Number(this.state.score) + Number(this.state.z),
        });
    }
  };
  callback = (x) => {
    x();
  };
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
        <Button
          id="correct"
          onClick={() => this.verify("correct", slide["type"])}
          variant="secondary"
          className="answers"
        >
          {canswers}
        </Button>,
        <Button
          id="incorrect1"
          onClick={() => this.verify("incorrect", slide["type"])}
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
            onClick={() => this.verify("incorrect", slide["type"])}
            variant="secondary"
            className="answers"
          >
            {incanswers[1]}
          </Button>,
          <Button
            id="incorrect3"
            onClick={() => this.verify("incorrect", slide["type"])}
            variant="secondary"
            className="answers"
          >
            {incanswers[2]}
          </Button>
        );
      }
      buttons = shuffle(buttons);
      this.setState({ f: this.state.f + 1 });
      document.getElementById("title").innerHTML = quest;
      document.getElementById("nextB").style.display = "none";
      ReactDOM.render(<>{buttons}</>, document.getElementById("content"));
      ReactDOM.render(
        <Timer
          initialTime={60000}
          direction="backward"
          startImmediately={true}
          lastUnit="s"
        >
          {({ start, resume, pause, stop, reset, timerState, getTime }) => (
            <React.Fragment>
              <div>
                <Timer.Seconds onChange={this.handlechange(getTime())} />
              </div>
              {this.callback(pause)}
              <br />
            </React.Fragment>
          )}
        </Timer>,
        document.getElementById("time")
      );
    } else {
      this.setState({ complete: true });
      ReactDOM.render(
        <div id="success">Votre score est {this.state.score}</div>,
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
            <Card.Header id="time"></Card.Header>
            <Card.Title id="title">{}</Card.Title>
            <Card.Text id="content">
              <Button
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
            >
              Next
            </Button>
          </Card.Footer>
        </Card>
        <Button onClick={() => this.callback}> hey </Button>
      </>
    );
  }
}

export default Topic;
