import React from "react";
/* import Counter from "./Timer/Timer"; */
import Header from "./Header/Header";
import Home from "./Home/Home";
import "./App.css";
import { Route, Link, Switch, useLocation } from "react-router-dom";

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route path="/" render={(props) => <Home />}></Route>
      </Switch>
    </div>
  );
}

export default App;
