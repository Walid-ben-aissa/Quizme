import React from "react";
import { Button } from "react-bootstrap";

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { t: 0, t0: 0.0, tog: false, y: 0 };
  }
  start = () => {
    this.setState({ tog: !this.state.tog });
    console.log(this.state.tog);
    const t0 = performance.now();
    this.setState({ t0: t0 });
    if (!this.state.tog) {
      this.setState({
        y: setInterval(() => {
          this.setState({
            t: this.props.time - (performance.now() - t0) / 1000,
          });
        }, 10),
      });
    } else {
      clearInterval(this.state.y);
    }
  };
  componentDidMount() {
    this.setState({ t: Number(this.props.time) });
  }
  render() {
    return (
      <div>
        <Button size="lg" variant="info" onClick={this.start}>
          Start!
        </Button>
        <br />
        {Math.abs(this.state.t.toFixed(2))}
      </div>
    );
  }
}
function Counter() {
  return (
    <div>
      <Timer time="120.0" />
    </div>
  );
}

export default Counter;
