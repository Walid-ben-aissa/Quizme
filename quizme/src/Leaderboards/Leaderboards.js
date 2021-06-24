import React from "react";
import { CardColumns, Card, Row, Col, Image } from "react-bootstrap";

function getid(x, cat) {
  for (let i of cat) if (i["id"] === x) console.log(i);
}
class Leaderboards extends React.Component {
  state = { x: <></> };
  componentDidMount() {
    fetch("http://127.0.0.1:8000/getscores").then((rep) => {
      rep.json().then((data) => {
        let scores = {};
        for (let idx of data) {
          scores[idx["id_quiz"]] = [
            ...(scores[idx["id_quiz"]] || []),
            [{ id_account: idx["id_account"] }, { score: idx["score"] }],
          ];
        }
        var cat = JSON.parse(localStorage["categories"]);
        let x = [];
        for (let idx in scores) {
          let y = scores[idx].map((element, id) => {
            console.log(scores);
            return (
              <Card key={id} className="button">
                <Card.Body>
                  <Card.Title>{}</Card.Title>
                  <Card.Title>{element[0]["id_account"]}</Card.Title>
                  <Card.Text>{element[1]["score"]}</Card.Text>
                </Card.Body>
              </Card>
            );
          });
          x.push(y);
        }
        console.log(x);
        this.setState({ x: <>{x}</> });
      });
    });
  }
  render() {
    return <>{this.state.x}</>;
  }
}
export default Leaderboards;
/* */
