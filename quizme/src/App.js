import React from 'react';
import './App.css';


class Timer extends React.Component{
  state={
    x:this.props.time
  }
  count(){
    this.setState()
  }
  componentDidMount(){
    // setInterval(this.count,1000);
  }
  render(){
    return(this.state.x)}
}

class Counter extends React.Component{
render(){
  return(<div><Timer time="30.0"/><br/>
  <Timer time="60.0"/><br/>
  <Timer time="120.0"/></div>)
}
}
function App() {
  return (
    <div>
      <Counter/>
    </div>
  );
}

export default App;
