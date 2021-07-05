import React from "react";
import { Card, Col } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import "./Leaderboards.css";

function getid(cat, x) {
  for (let i of cat) {
    if (i["id"] === x) return i["name"];
  }
}
class Leaderboards extends React.Component {
  state = { x: true, show1: false, show2: true };
  componentDidMount() {
    fetch("https://12d1ol.deta.dev/getscores").then((rep) => {
      rep.json().then((data) => {
        if (data !== "nothing") {
          let scores = {};
          for (let idx of data) {
            scores[idx["id_quiz"]] = [
              ...(scores[idx["id_quiz"]] || []),
              [
                { name: idx["name"] },
                { surname: idx["surname"] },
                { score: idx["score"] },
              ],
            ];
          }
          var cat = JSON.parse(localStorage["categories"]);
          let x = [];

          for (let idx in scores) {
            let y = scores[idx].map((element, id) => {
              return (
                <Col lg={{ span: 8, offset: 2 }}>
                  <Accordion.Collapse eventKey={idx}>
                    <Card key={id} className="cards">
                      <Card.Body>
                        <Card.Title>
                          {element[0]["name"] + " " + element[1]["surname"]}
                        </Card.Title>
                        <Card.Text>{element[2]["score"]}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Accordion.Collapse>
                </Col>
              );
            });
            x.push(
              <div id={idx}>
                <h1 className="headers">
                  <Accordion.Toggle eventKey={idx} as="h1">
                    {getid(cat, parseInt(idx)) + " quiz scores "}
                  </Accordion.Toggle>
                </h1>
                {y}
              </div>
            );
          }
          console.log(x);
          this.setState({ x: <>{x}</>, show1: true, show2: false });
        }
      });
    });
  }
  render() {
    console.log(this.state.show2);
    return (
      <>
        {this.state.show1 && <Accordion id="board">{this.state.x}</Accordion>}
        {this.state.show2 && <h1 id="empty">No scores to show 🙁</h1>}
      </>
    );
  }
}
export default Leaderboards;
