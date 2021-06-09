import React from "react";
import "./App.css";

class Timer extends React.Component {
  state = {
    x: parseFloat(this.props.time),
  };
  count = function () {
    this.setState({ x: this.state.x - 0.01 });
  };
  componentDidMount() {
    this.y = setInterval(this.count, 10);
  }
  render() {
    if (this.state.x < 0.001) clearInterval(this.y);
    return <div>{Math.abs(this.state.x.toFixed(2))}</div>;
  }
}

class Counter extends React.Component {
  render() {
    return (
      <div>
        <Timer time="30.0" />
        <br />
        <Timer time="60.0" />
        <br />
        <Timer time="120.0" />
      </div>
    );
  }
}
function App() {
  return (
    <div>
      <Counter />
    </div>
  );
}

export default App;
