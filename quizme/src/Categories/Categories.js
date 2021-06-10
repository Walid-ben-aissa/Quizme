import React, { useState } from "react";

class Categories extends React.Component {
  state = { x: "" };
  getcats() {
    fetch("https://opentdb.com/api_category.php")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ x: Object.values(data)[0] });
      });
  }
  render() {
    /*  console.log(y);
    y.map((val) => <li>{val}</li>); */
    console.log("this.state.x");
    return null;
  }
}
export default Categories;
