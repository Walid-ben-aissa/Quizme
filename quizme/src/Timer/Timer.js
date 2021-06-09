import React from "react";

class Timer extends React.Component {
  state = {
    x: parseFloat(this.props.time),
    t: parseFloat(this.props.time),
  };
  count = () => {
    this.setState({ x: this.state.x - 0.1 });
  };
  start = () => {
    this.y = setInterval(this.count, 100);
    this.t0 = performance.now();
  };
  componentDidMount() {
    this.t = this.props.time;
    console.log(this.t);
  }
  render() {
    console.log();
    this.t = this.props.time - (performance.now() - this.t0) / 1000;
    console.log();
    if (this.t < 0) {
      clearInterval(this.y);
      this.t = 0;
    }
    return (
      <div>
        <button onClick={this.start}> Start!</button>
        <br />
        {Math.abs(this.t.toFixed(2))}
      </div>
    );
  }
}
function Counter() {
  return (
    <div>
      <Timer time="120" />
    </div>
  );
}

export default Counter;
