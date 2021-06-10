import React, { useState } from "react";
import ReactDOM from "react-dom";

class Categories extends React.Component {
  state = { x: "" };
  render() {
    fetch("https://opentdb.com/api_category.php")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ x: Object.values(data)[0] });
      });
    this.state.x.map((val) => <li>{val}</li>);
    console.log(this.state.x);
    return <ul>{this.state.x}</ul>;
  }
}
export default Categories;
