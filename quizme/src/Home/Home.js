import React from "react";
import { Link } from "react-router-dom";
import { CardColumns, Card, Col } from "react-bootstrap";
import "./Home.css";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { x: <div></div> };
  }
  componentDidMount() {
    fetch("https://opentdb.com/api_category.php")
      .then((response) => response.json())
      .then((data) => {
        localStorage["categories"] = JSON.stringify(data["trivia_categories"]);
        console.log(data["trivia_categories"]);
        let y = data["trivia_categories"].map((element, idx) => {
          return (
            <div key={idx}>
              <Link to={`/topic/${element["id"]}`} className="linktop">
                <Card className="button">
                  <Card.Body>
                    <Card.Title>{element["name"]}</Card.Title>
                    <Card.Text></Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </div>
          );
        });
        this.setState({ x: y });
      });
  }
  render() {
    return (
      <div>
        <br />
        <h1 id="choice">Choose a category!</h1>
        <Col lg={{ offset: 1, span: 10 }}>
          <CardColumns id="deck">{this.state.x}</CardColumns>
        </Col>
        <br />
        <br />
      </div>
    );
  }
}
export default Home;
