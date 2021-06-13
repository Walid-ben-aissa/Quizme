import React from "react";
/* import Counter from "./Timer/Timer"; */
import Header from "./Header/Header";
import Home from "./Home/Home";
import Categories from "./Categories/Categories";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import Topic from "./Topic/Topic";

function App() {
  return (
    <div>
      <Container fluid>
        <Header />
        <Switch>
          <Route path="/categories">
            <Categories />
          </Route>
          <Route path="/topic/:topid">
            <Topic />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Container>
    </div>
  );
}

export default App;
