import React from "react";

class Leaderboards extends React.Component {
  state = {};
  componentDidMount() {
    fetch("https://opentdb.com/api_category.php")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ categories: data["trivia_categories"] });
      });
    fetch("http://127.0.0.1:8000/getscores").then((rep) => {
      rep.json().then((data) => {
        for (rep of data) console.log(rep);
      });
    });
  }
  render() {
    return null;
  }
}
export default Leaderboards;
