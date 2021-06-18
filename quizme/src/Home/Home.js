import React from "react";
import Carousel from "react-bootstrap/Carousel";
import img1 from "./slide1.jpg";
import img2 from "./slide2.jpg";
import img3 from "./slide3.jpg";
import { Link } from "react-router-dom";
import { CardColumns, Card, Row, Col, Image } from "react-bootstrap";
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
        let y = data["trivia_categories"].map((element, idx) => {
          return (
            <div>
              <Link to={`/topic/${element["id"]}`} className="link">
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
        console.log(y);
        this.setState({ x: y });
      });
  }
  render() {
    return (
      <div>
        <br />
        <h1 className="title display-1 text-light">Choisir un Quiz!</h1>
        <br />
        <Row>
          <Col xs={{ span: 6, offset: 3 }}>
            <Carousel>
              <Carousel.Item>
                <Image
                  fluid
                  rounded
                  className="d-block h-100 w-100"
                  src={img1}
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h3>Animaux</h3>
                  <p>Testez votre connaisances sur les animaux!</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <Image
                  fluid
                  rounded
                  className="d-block h-100 w-100"
                  src={img2}
                  alt=""
                />
                <Carousel.Caption>
                  <h3 className="text-dark">Histoire</h3>
                  <p className="text-dark">
                    Testez votre connaisances historiques!
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <Image
                  fluid
                  rounded
                  className="d-block h-100 w-100"
                  src={img3}
                  alt="Third slide"
                />

                <Carousel.Caption>
                  <h3>Art</h3>
                  <p>Testez votre connaisances artisqtiques!</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
        <br />
        <br />
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
