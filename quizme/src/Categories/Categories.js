import React from "react";
import { Link } from "react-router-dom";

class Categories extends React.Component {
  state = { x: "" };
  componentDidMount() {
    fetch("https://opentdb.com/api_category.php")
      .then((response) => response.json())
      .then((data) => {
        let y = data["trivia_categories"].map((element) => {
          return (
            <li>
              <Link to={`/topic/${element["id"]}`} style={{ color: "white" }}>
                {element["name"]}
              </Link>
            </li>
          );
        });
        console.log(y);
        this.setState({ x: y });
      });
  }
  render() {
    return <ol style={{ color: "white" }}>{this.state.x}</ol>;
  }
}
export default Categories;
